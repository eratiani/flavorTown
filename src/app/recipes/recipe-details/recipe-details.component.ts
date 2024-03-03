import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IRecipe } from '../shared/interfaces/recipe.interface';
import { RecipeService } from '../shared/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dbServ: RecipeService,
    private router: Router
  ) {}
  curRecipe!: IRecipe;
  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async (params) => {
      const id = params['id'];

      if (!id) return;
      try {
        this.curRecipe = await this.dbServ.getRecipe(id);
      } catch (error) {
        console.log(error);
      }
    });
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  onEditRecipe() {
    this.router.navigate(['/Recipe/edit'], {
      queryParams: { id: this.curRecipe.id },
    });
  }
  async onFavClick() {
    const favorites = !this.curRecipe.favorites;
    try {
      await this.dbServ.updateRecipe(this.curRecipe.id, {
        favorites,
      });
    } catch (error) {
      console.log(error);
    }
    this.curRecipe.favorites = !this.curRecipe.favorites;
  }
}
