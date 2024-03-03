import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRecipeViewComponent } from './add-recipe-view/add-recipe-view.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { EditRecipeFormComponent } from './edit-recipe-form/edit-recipe-form.component';

@NgModule({
  declarations: [
    AddRecipeComponent,
    AddRecipeViewComponent,
    EditRecipeFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule,
    MatDialogModule,
  ],
})
export class RecipeFormModule {}
