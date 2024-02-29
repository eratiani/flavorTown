import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

import { RecipesViewComponent } from './recipes-view/recipes-view.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { CoreModule } from '../core/core.module';
@NgModule({
  declarations: [RecipesViewComponent, RecipeComponent, RecipeDetailsComponent],
  imports: [CommonModule, CoreModule, MatPaginatorModule],
})
export class RecipesModule {}
