import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { RecipeService } from '../shared/services/recipe.service';
import { IRecipe } from '../shared/interfaces/recipe.interface';
import { Subscription } from 'rxjs';
import { DebouncingService } from 'src/app/shared/services/debouncing.service';

@Component({
  selector: 'app-recipes-view',
  templateUrl: './recipes-view.component.html',
  styleUrls: ['./recipes-view.component.scss'],
})
export class RecipesViewComponent implements OnInit, OnDestroy {
  recipes: IRecipe[] = [];
  displeyedRecipes!: IRecipe[];
  private debouncingSubscription!: Subscription;
  constructor(
    public recipeServ: RecipeService,
    private debouncingServ: DebouncingService
  ) {}
  async ngOnInit(): Promise<void> {
    try {
      this.recipes = await this.recipeServ.getRecipes();
      this.displeyedRecipes = this.recipes.slice(0, 6);
      this.debouncingSubscription = this.debouncingServ
        .debounce(500)
        .subscribe(async (val) => {
          this.recipes = this.filterBySearchInp(
            val,
            await this.recipeServ.getRecipes()
          );
          this.displeyedRecipes = this.recipes.slice(0, 5);
        });
    } catch (error) {
      console.log(error);
    }
  }
  ngOnDestroy(): void {
    if (!this.debouncingSubscription) return;
    this.debouncingSubscription.unsubscribe();
  }
  onPageChange(e: PageEvent) {
    const startIndex = e.pageIndex * e.pageSize;
    const endIndex = startIndex + e.pageSize;

    this.displeyedRecipes = this.recipes.slice(startIndex, endIndex);
  }
  filterBySearchInp(queryArr: string[], recipes: IRecipe[]) {
    const [query, searchType] = queryArr;
    const regex = new RegExp(`^${query}`);
    switch (searchType) {
      case 'favorites':
        return recipes.filter((recipe) => recipe.favorites);
      case 'title':
        return recipes.filter((recipe) =>
          regex.test(recipe.title.toLowerCase())
        );
      case 'ingredient':
        return recipes.filter((recipe) =>
          recipe.ingredients.some((ingredient) =>
            regex.test(ingredient.title.toLowerCase())
          )
        );
      case ' ':
        return recipes;
      default:
        return [];
    }
  }
}
