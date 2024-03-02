import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TextCutPipe } from './pipes/text-cut.pipe';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, TextCutPipe],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent, TextCutPipe],
})
export class CoreModule {}
