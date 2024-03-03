import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../shared/interfaces/recipe.interface';
import { RecipeService } from '../shared/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    /// same id lost on refresh
    // const id = this.shortUuidServ.getActualUuid('1');
    this.route.queryParams.subscribe(async (params) => {
      const id = params['id'];

      if (!id) return;
      this.curRecipe = await this.dbServ.getRecipe(id);
    });
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  async onFavClick() {
    let favorites = !this.curRecipe.favorites;
    await this.dbServ.updateRecipe(this.curRecipe.id, {
      favorites,
    });
    this.curRecipe.favorites = !this.curRecipe.favorites;
  }
}
