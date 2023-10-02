import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { ButtonMainComponent } from './button-main/button-main.component';
import { InputInvalidComponent } from './input-invalid/input-invalid.component';
import { SectionsTitleComponent } from './sections-title/sections-title.component';
import { SubTitlesComponent } from './sub-titles/sub-titles.component';

@NgModule({
  declarations: [
    AlertSuccessComponent,
    ButtonMainComponent,
    InputInvalidComponent,
    SectionsTitleComponent,
    SubTitlesComponent,
  ],
  imports: [CommonModule],
  exports: [
    AlertSuccessComponent,
    ButtonMainComponent,
    InputInvalidComponent,
    SectionsTitleComponent,
    SubTitlesComponent,
  ],
})
export class ComponentsModule {}
