import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TextCutPipe } from './pipes/text-cut.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, TextCutPipe],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, TextCutPipe],
})
export class CoreModule {}
