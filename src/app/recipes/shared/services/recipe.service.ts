import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:4001';

  constructor(private http: HttpClient) {}

  async getRecipes<T>(): Promise<T[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<T[]>(`${this.apiUrl}/recipes`)
      );
      return data;
    } catch (error) {
      /// for linting
      console.log(error);
      // for rethrowing error
      throw error;
    }
  }
  async getRecipe<T>(id: string): Promise<T> {
    try {
      const data = await firstValueFrom(
        this.http.get<T>(`${this.apiUrl}/recipes/${id}`)
      );
      return data;
    } catch (error) {
      /// for linting
      console.log(error);
      // for rethrowing error
      throw error;
    }
  }
  async addRecipe<T>(newRecipe: Omit<T, 'id'>): Promise<T> {
    try {
      const id = uuidv4();
      const data = await firstValueFrom(
        this.http.post<T>(`${this.apiUrl}/recipes`, { ...newRecipe, id })
      );
      return data;
    } catch (error) {
      /// for linting
      console.log(error);
      // for rethrowing error
      throw error;
    }
  }
  async updateRecipe<T>(id: string, newRecipy: Partial<T>): Promise<T> {
    try {
      const request = await firstValueFrom(
        this.http.patch<T>(`${this.apiUrl}/recipes/${id}`, newRecipy)
      );
      return request;
    } catch (error) {
      /// for linting
      console.log(error);
      // for rethrowing error
      throw error;
    }
  }
  async deleteRecipe(id: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/recipes/${id}`));
    } catch (error) {
      /// for linting
      console.log(error);
      // for rethrowing error
      throw error;
    }
  }
}
