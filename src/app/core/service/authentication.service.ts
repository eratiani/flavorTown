import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isHomePage: boolean = true;
  constructor() {}
}
