import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IIngredients,
  IRecipe,
} from 'src/app/recipes/shared/interfaces/recipe.interface';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { RecipeService } from 'src/app/recipes/shared/services/recipe.service';
import { SucessModalComponent } from 'src/app/stand-alone/sucess-modal/sucess-modal.component';

@Component({
  selector: 'app-edit-recipe-form',
  templateUrl: './edit-recipe-form.component.html',
  styleUrls: ['./edit-recipe-form.component.scss'],
})
export class EditRecipeFormComponent implements OnInit {
  curRecipe!: IRecipe;
  recipeCreateForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dbServ: RecipeService,
    private authServ: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    public matSuccess: MatDialog
  ) {}
  ngOnInit(): void {
    this.recipeCreateForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2)]],
      description: [null, [Validators.required, Validators.minLength(4)]],
      instructions: [null, [Validators.required, Validators.minLength(4)]],
      ingredients: new FormArray([new FormControl(null, Validators.required)]),
    });
    this.route.queryParams.subscribe(async (params) => {
      const id = params['id'];

      if (!id) return;
      try {
        this.curRecipe = await this.dbServ.getRecipe(id);
      } catch (error) {
        console.log(error);
      }
      this.recipeCreateForm.patchValue({
        title: this.curRecipe.title,
        description: this.curRecipe.description,
        instructions: this.curRecipe.instructions,
      });

      const ingredientsFormArray = this.recipeCreateForm.get(
        'ingredients'
      ) as FormArray;
      ingredientsFormArray.clear();

      if (this.curRecipe.ingredients && this.curRecipe.ingredients.length > 0) {
        this.curRecipe.ingredients.forEach((ingredient: IIngredients) => {
          ingredientsFormArray.push(
            new FormControl(ingredient.title, Validators.required)
          );
        });
      }
    });
  }
  ////////form array
  get formArray(): FormArray {
    return this.recipeCreateForm.get('ingredients') as FormArray;
  }

  addFormControl() {
    const newControl = this.formBuilder.control(null, Validators.required);
    this.formArray.push(newControl);
  }

  removeFormControl(index: number) {
    this.formArray.removeAt(index);
  }
  get getFormArrayControls(): FormControl[] {
    return this.formArray.controls as FormControl[];
  }
  ////////form array
  goBack() {
    this.authServ.isHomePage = true;
    this.router.navigate(['/home/details'], {
      queryParams: { id: this.curRecipe.id },
    });
  }

  //// utility
  checkForError(
    formElement: string,
    error: string,
    ind: number = 0
  ): boolean | undefined {
    if (formElement === 'ingredients') {
      const control = this.recipeCreateForm.get(`${formElement}.${ind}`);

      return control?.hasError(`${error}`);
    }
    return this.recipeCreateForm.get(`${formElement}`)?.hasError(`${error}`);
  }
  redOrGreenColor(
    formElement: string,
    error: string,
    ind: number = 0,
    errorReq: string = 'required'
  ) {
    if (formElement === 'ingredients') {
      return this.checkForError(`${formElement}.${ind}`, `${error}`, ind) ||
        this.checkForError(`${formElement}.${ind}`, `${errorReq}`, ind)
        ? this.recipeCreateForm.get(`${formElement}.${ind}`)?.dirty ||
          this.recipeCreateForm.get(`${formElement}.${ind}`)?.touched
          ? '#EA1919'
          : ''
        : this.recipeCreateForm.get(`${formElement}.${ind}`)?.dirty ||
          this.recipeCreateForm.get(`${formElement}.${ind}`)?.touched
        ? '#14D81C'
        : '';
    }
    return this.checkForError(`${formElement}`, `${error}`, ind) ||
      this.checkForError(`${formElement}`, `${errorReq}`, ind)
      ? this.recipeCreateForm.get(`${formElement}`)?.dirty ||
        this.recipeCreateForm.get(`${formElement}`)?.touched
        ? '#EA1919'
        : ''
      : this.recipeCreateForm.get(`${formElement}`)?.dirty ||
        this.recipeCreateForm.get(`${formElement}`)?.touched
      ? '#14D81C'
      : '';
  }
  ///utility

  //////edit recipe
  async updateRecipe() {
    if (!this.recipeCreateForm.valid) return;
    const favorites: boolean = false;
    const id = this.curRecipe.id;
    const { title, description, instructions, ingredients } =
      this.recipeCreateForm.value;
    const changedIngredients = (ingredients as string[]).map((ing: string) => ({
      title: ing,
      textColor: 'white',
      backgroundColor: 'rgb(177, 28, 214)',
    }));
    const submitObj: Omit<IRecipe, 'id' | 'imgUrl'> = {
      instructions,
      title,
      favorites,
      description,
      ingredients: changedIngredients,
    };
    try {
      await this.dbServ.updateRecipe(id, submitObj);
    } catch (error) {
      console.log(error);
    }
    this.matSuccess.open(SucessModalComponent);
  }
  ////// edit recipe
}
