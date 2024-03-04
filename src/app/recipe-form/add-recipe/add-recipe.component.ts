import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { IRecipe } from 'src/app/recipes/shared/interfaces/recipe.interface';
import { RecipeService } from 'src/app/recipes/shared/services/recipe.service';
import { SucessModalComponent } from 'src/app/stand-alone/sucess-modal/sucess-modal.component';
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  image: string | undefined;
  imageName: string | undefined;
  recipeCreateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private recipeServ: RecipeService,
    public matSuccess: MatDialog
  ) {}
  ngOnInit(): void {
    this.recipeCreateForm = this.formBuilder.group({
      image: [null, [Validators.required]],
      title: [null, [Validators.required, Validators.minLength(2)]],
      description: [null, [Validators.required, Validators.minLength(4)]],
      instructions: [null, [Validators.required, Validators.minLength(4)]],
      ingredients: new FormArray([new FormControl(null, Validators.required)]),
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

  ////////img drag@ drop
  onDragOver(event: Event) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.handleFile(event.dataTransfer!.files);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.handleFile(target.files);
    }
  }
  private handleFile(files: FileList) {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = reader.result as string;
        const imgName = files[0].name;
        this.image = img;
        this.imageName = imgName;
      };
      reader.readAsDataURL(files[0]);
    }
  }
  removeImage() {
    this.recipeCreateForm.get('image')?.reset();
    this.image = undefined;
    this.imageName = undefined;
  }
  converToBlob(imageData: string) {
    const byteCharacters = atob(imageData.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' });
  }
  ////////img drag@ drop
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

  //////add recipe
  async createRecipe() {
    if (!this.recipeCreateForm.valid) return;
    // const image = this.converToBlob(this.image as string);
    const defaultImg = 'default.jpg';
    const favorites: boolean = false;
    const { title, description, instructions, ingredients } =
      this.recipeCreateForm.value;
    const changedIngredients = (ingredients as string[]).map((ing: string) => ({
      title: ing,
      textColor: 'white',
      backgroundColor: 'rgb(177, 28, 214)',
    }));
    const submitObj: Omit<IRecipe, 'id'> = {
      imgUrl: defaultImg,
      instructions,
      title,
      favorites,
      description,
      ingredients: changedIngredients,
    };

    try {
      await this.recipeServ.addRecipe(submitObj);
    } catch (error) {
      console.log(error);
    }
    this.matSuccess.open(SucessModalComponent);
  }
  ////// add recipe
}
