import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:4001';

  constructor(private http: HttpClient) {}

  async getRecipes(): Promise<any> {
    try {
      const request = await firstValueFrom(
        this.http.get(`${this.apiUrl}/recipes`)
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
}
