import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isHomePage: boolean = true;
  constructor(
    private router: Router,
    private authServ: AuthenticationService
  ) {}
  onAddRecipe() {
    this.authServ.isHomePage = false;
    this.router.navigate(['./Recipe']);
  }
  ngOnInit(): void {
    this.isHomePage = this.authServ.isHomePage;
  }
  navHome() {
    this.authServ.isHomePage = true;
    this.router.navigate(['./home']);
  }
}
