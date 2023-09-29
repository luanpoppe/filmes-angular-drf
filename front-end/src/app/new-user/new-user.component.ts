import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NewUserType } from 'src/utils/new-user-type';
import { AddNewUserService } from '../shared/add-new-user.service';
import { GetUsersService } from '../shared/get-users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  formulario!: FormGroup;
  newUser!: NewUserType;
  allUsers!: NewUserType[];
  lastUser!: NewUserType;
  newId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private service: AddNewUserService,
    private serviceGetUsers: GetUsersService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null],
      nome: [null],
      password: [null],
      passwordRepeat: [null],
    });

    this.serviceGetUsers.getUsers().subscribe((data: any) => {
      this.allUsers = data;
      this.allUsers.slice(-1).forEach((user: NewUserType) => {
        this.newId = user.id;
      });
    });
  }

  onSubmit() {
    this.newId += 1;
    this.newUser = {
      id: this.newId,
      nome: this.formulario.value.nome,
      email: this.formulario.value.email,
      password: this.formulario.value.password,
    };
    this.service.addNewUser(this.newUser).subscribe({
      next: () => {
        this.formulario.reset();
      },
    });
  }
}
