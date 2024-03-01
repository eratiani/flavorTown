export interface IRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imgUrl: string;
  favorites: boolean;
}