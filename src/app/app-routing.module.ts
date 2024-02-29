import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesViewComponent } from './recipes/recipes-view/recipes-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: RecipesViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
