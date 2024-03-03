import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonComponent } from '../button/button.component';
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
    private authServ: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  closePopup() {
    if (this.authServ.isHomePage) {
      this.route.queryParams.pipe(take(1)).subscribe((param) => {
        if (!param || !param['id']) return;

        this.router.navigate(['/home/details'], {
          queryParams: { id: param['id'] },
        });
        this.dialogRef.close();
      });
      return;
    }
    this.authServ.isHomePage = true;
    this.router.navigate(['./home']);
    this.dialogRef.close();
  }
}
