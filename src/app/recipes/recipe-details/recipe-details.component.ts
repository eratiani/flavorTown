import { Component, OnInit } from '@angular/core';
import { ShortUuidService } from 'src/app/shared/services/short-uuid.service';
import { IRecipe } from '../shared/interfaces/recipe.interface';
import { RecipeService } from '../shared/services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  constructor(
    private shortUuidServ: ShortUuidService,
    private dbServ: RecipeService,
    private router: Router
  ) {}
  curRecipe!: IRecipe;
  async ngOnInit(): Promise<void> {
    const id = this.shortUuidServ.getActualUuid('1');
    if (!id) return;
    this.curRecipe = await this.dbServ.getRecipe(id);
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
