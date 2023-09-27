import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  @Input() inputType!: string;
  @Input() inputForId!: string;
  @Input() inputLabel!: string;
  @Input() inputName!: string;

  constructor() {}

  ngOnInit(): void {}
}
