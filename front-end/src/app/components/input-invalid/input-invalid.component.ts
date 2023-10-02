import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-invalid',
  templateUrl: './input-invalid.component.html',
  styleUrls: ['./input-invalid.component.scss'],
})
export class InputInvalidComponent implements OnInit {
  @Input() alertMessage!: string;

  constructor() {}

  ngOnInit(): void {}
}
