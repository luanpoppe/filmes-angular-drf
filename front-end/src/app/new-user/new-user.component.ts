import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NewUserType } from 'src/utils/new-user-type';
import { AddNewUserService } from '../shared/add-new-user.service';
import { GetUsersService } from '../shared/get-users.service';
import { FormValidations } from '../shared/form-validations';
import { Router } from '@angular/router';

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

  userName!: string;
  userEmail!: string;
  userPassword!: string;
  userRepeatPassword!: string;

  isNameInvalid!: boolean;
  isNameTooShort!: boolean;
  isEmailInvalid!: boolean;
  isPasswordInvalid!: boolean;
  isPasswordRepeatInvalid!: boolean;
  isPasswordsTheSame!: boolean;
  isEmailAlreadyInUse!: boolean;

  successfulCreatedUser!: boolean;
  serverError!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: AddNewUserService,
    private serviceGetUsers: GetUsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required, FormValidations.nameValidator]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(2)]],
      passwordRepeat: [
        null,
        [Validators.required, FormValidations.equalsToValidator('password')],
      ],
    });

    this.serviceGetUsers.getUsers().subscribe((data: any) => {
      this.allUsers = data;
      this.allUsers.slice(-1).forEach((user: NewUserType) => {
        this.newId = user.id;
      });
    });
  }

  onSubmit() {
    this.userEmail = this.formulario.value.email;
    this.userName = this.formulario.value.name;
    this.userPassword = this.formulario.value.password;
    this.userPassword = this.formulario.get('password')?.value;

    this.isNameInvalid = false;
    this.isNameTooShort = false;
    this.isEmailInvalid = false;
    this.isPasswordInvalid = false;
    this.isPasswordRepeatInvalid = false;
    this.isPasswordsTheSame = false;
    this.isEmailAlreadyInUse = false;

    this.successfulCreatedUser = false;
    this.serverError = false;

    // Checar se o nome é válido:
    if (this.formulario.get('name')?.hasError('required')) {
      // Se não tiver nenhum nome:
      this.isNameInvalid = true;
    } else if (this.formulario.get('name')?.hasError('nameTooShort')) {
      // Se tiver digitado apenas um nome:
      this.isNameTooShort = true;
    }

    // Pega a lista de todos os usuários, e filtra os emails
    this.serviceGetUsers.getUsers().subscribe((users: any) => {
      const filterUsers: any[] = users.filter(
        (u: NewUserType) => u.email === this.userEmail
      );
      // Checar se o email já foi utilizado:
      if (filterUsers.length > 0) {
        this.isEmailAlreadyInUse = true;
      } // Checar se o email é válido:
      else if (this.formulario.get('email')?.invalid) {
        this.isEmailInvalid = true;
      }
    });

    // Checar se o password é válido:
    if (this.formulario.get('password')?.invalid) {
      this.isPasswordInvalid = true;
      // Se o password estiver válido, checar se o "repeatPassword" está válido
    } else if (this.formulario.get('passwordRepeat')?.invalid) {
      this.isPasswordRepeatInvalid = true;
    }

    if (
      !this.isNameInvalid &&
      !this.isNameTooShort &&
      !this.isEmailInvalid &&
      !this.isPasswordInvalid &&
      !this.isPasswordRepeatInvalid &&
      !this.isEmailAlreadyInUse &&
      !this.isPasswordsTheSame
    ) {
      //Se todas validações funcionarem - Adicionar de fato o usuário
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
          // Pega a lista de todos os usuários, e filtra os emails
          this.serviceGetUsers.getUsers().subscribe((users: any) => {
            const filterUsers: any[] = users.filter(
              (u: NewUserType) => u.email === this.userEmail
            );
            // Checar se o email já foi utilizado:
            if (filterUsers.length > 0) {
              // Se sim --> Mensagem de sucesso + redirecionamento para página de login
              this.successfulCreatedUser = true;
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
            }
          });
        },
        error: () => {
          this.serverError = true;
        },
      });
    }
  }
}
