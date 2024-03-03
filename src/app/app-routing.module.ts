import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesViewComponent } from './recipes/recipes-view/recipes-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { AddRecipeViewComponent } from './recipe-form/add-recipe-view/add-recipe-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: RecipesViewComponent,
  },
  {
    path: 'home/:id',
    component: RecipeDetailsComponent,
  },
  {
    path: 'Recipe',
    component: AddRecipeViewComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
