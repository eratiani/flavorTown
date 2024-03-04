import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RecipesModule } from './recipes/recipes.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeFormModule } from './recipe-form/recipe-form.module';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    RecipesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RecipeFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
