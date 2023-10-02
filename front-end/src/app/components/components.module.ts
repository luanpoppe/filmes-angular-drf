import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { ButtonMainComponent } from './button-main/button-main.component';
import { InputInvalidComponent } from './input-invalid/input-invalid.component';
import { SectionsTitleComponent } from './sections-title/sections-title.component';
import { SubTitlesComponent } from './sub-titles/sub-titles.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdToastInline } from './toast/toast.component';

@NgModule({
  declarations: [
    AlertSuccessComponent,
    ButtonMainComponent,
    InputInvalidComponent,
    SectionsTitleComponent,
    SubTitlesComponent,
    NgbdToastInline,
  ],
  imports: [CommonModule, NgbToastModule],
  exports: [
    AlertSuccessComponent,
    ButtonMainComponent,
    InputInvalidComponent,
    SectionsTitleComponent,
    SubTitlesComponent,
    NgbdToastInline,
  ],
})
export class ComponentsModule {}
