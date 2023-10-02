import { Component, Input, OnInit } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ngbd-toast-inline',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class NgbdToastInline {
  show = true;
  @Input() toastContent!: string;
}
