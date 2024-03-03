import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-add-recipe-view',
  templateUrl: './add-recipe-view.component.html',
  styleUrls: ['./add-recipe-view.component.scss'],
})
export class AddRecipeViewComponent implements OnInit {
  constructor(
    private authServ: AuthenticationService,
    private router: Router
  ) {}
  navHome() {
    this.authServ.isHomePage = true;
    this.router.navigate(['../']);
  }
  ngOnInit(): void {
    this.authServ.isHomePage = false;
  }
}
