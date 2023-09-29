import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sub-titles',
  templateUrl: './sub-titles.component.html',
  styleUrls: ['./sub-titles.component.scss'],
})
export class SubTitlesComponent implements OnInit {
  @Input() content!: string;

  constructor() {}

  ngOnInit(): void {}
}
