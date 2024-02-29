import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';

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
  @Input() currRecipe: any;
  isHovered: boolean = false;
  onCardHover() {
    this.isHovered = true;
  }
  onCardLeave() {
    this.isHovered = false;
  }
}
