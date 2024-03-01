import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/services/recipe.service';
import { PageEvent } from '@angular/material/paginator';
import { IRecipe } from '../shared/interfaces/recipe.interface';

@Component({
  selector: 'app-recipes-view',
  templateUrl: './recipes-view.component.html',
  styleUrls: ['./recipes-view.component.scss'],
})
export class RecipesViewComponent implements OnInit {
  recipes!: IRecipe[];
  displeyedRecipes!: IRecipe[];
  constructor(public recipeServ: RecipeService) {}
  async ngOnInit(): Promise<void> {
    this.recipes = await this.recipeServ.getRecipes();
    this.displeyedRecipes = this.recipes.slice(0, 5);
  }
  onPageChange(e: PageEvent) {
    const startIndex = e.pageIndex * e.pageSize;
    const endIndex = startIndex + e.pageSize;

    this.displeyedRecipes = this.recipes.slice(startIndex, endIndex);
  }
}
