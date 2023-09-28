import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-main',
  templateUrl: './button-main.component.html',
  styleUrls: ['./button-main.component.scss'],
})
export class ButtonMainComponent implements OnInit {
  @Input() buttonContent!: string;
  @Input() buttonType: string = 'button';

  constructor() {}

  ngOnInit(): void {}
}
