import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
@Component({
  selector: 'app-sucess-modal',
  templateUrl: './sucess-modal.component.html',
  styleUrls: ['./sucess-modal.component.scss'],
  standalone: true,
  imports: [MatDialogModule, ButtonComponent],
})
export class SucessModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SucessModalComponent>,
    private router: Router,
    private authServ: AuthenticationService
  ) {}

  closePopup() {
    this.authServ.isHomePage = true;
    this.router.navigate(['./home']);
    this.dialogRef.close();
  }
}
