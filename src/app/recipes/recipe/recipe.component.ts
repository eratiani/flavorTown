import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { IRecipe } from '../shared/interfaces/recipe.interface';
import { Router } from '@angular/router';
import { ShortUuidService } from 'src/app/shared/services/short-uuid.service';

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
  constructor(
    private router: Router,
    private shortUuidServ: ShortUuidService
  ) {}
  onCardHover() {
    this.isHovered = true;
  }
  onCardLeave() {
    this.isHovered = false;
  }
  onNavigation() {
    this.shortUuidServ.setUuid('1', this.currRecipe.id);
    this.router.navigate(['/home/1']);
  }
}
