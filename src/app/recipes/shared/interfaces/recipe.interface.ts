export interface IRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: IIngredients[];
  instructions: string;
  imgUrl: string;
  favorites: boolean;
}
export interface IIngredients {
  title: string;
  textColor: string;
  backgroundColor: string;
}
