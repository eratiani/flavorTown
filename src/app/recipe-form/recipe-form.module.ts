import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRecipeViewComponent } from './add-recipe-view/add-recipe-view.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddRecipeComponent, AddRecipeViewComponent],
  imports: [CommonModule, ReactiveFormsModule, CoreModule, RouterModule],
})
export class RecipeFormModule {}
