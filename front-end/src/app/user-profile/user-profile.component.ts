import { Component, OnInit } from '@angular/core';
import { AddNewUserService } from '../shared/add-new-user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(private service: AddNewUserService) {}

  ngOnInit(): void {}
}
