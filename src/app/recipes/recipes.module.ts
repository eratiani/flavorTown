import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

import { RecipesViewComponent } from './recipes-view/recipes-view.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { CoreModule } from '../core/core.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    RecipesViewComponent,
    RecipeComponent,
    RecipeDetailsComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule,
  ],
})
export class RecipesModule {}
