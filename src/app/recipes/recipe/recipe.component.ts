import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IRecipe } from '../shared/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  animations: [
    trigger('cardHover', [
      state('true', style({ transform: 'scale(2.1)' })),
      state('false', style({ transform: 'scale(1)' })),
      transition('false => true', animate('0.3s ease-in')),
      transition('true => false', animate('0.3s ease-out')),
    ]),
  ],
})
export class RecipeComponent {
  @Input() currRecipe!: IRecipe;
  isHovered: boolean = false;
  constructor(private router: Router) {}
  onCardHover() {
    this.isHovered = true;
  }
  onCardLeave() {
    this.isHovered = false;
  }
  onNavigation() {
    ////this way id is lost whan refreshed did not want to set id in local/sesion storage
    // this.shortUuidServ.setUuid('1', this.currRecipe.id);
    // this.router.navigate(['/home/1']);
    this.router.navigate(['/home/details'], {
      queryParams: { id: this.currRecipe.id },
    });
  }
}
