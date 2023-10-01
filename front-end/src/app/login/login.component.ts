import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetUsersService } from '../shared/get-users.service';
import { NewUserType } from 'src/utils/new-user-type';
import { Router } from '@angular/router';
import { DataService } from '../shared/data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  isEmailInvalid: boolean = false;
  isPasswordInvalid: boolean = false;
  isPasswordWrong!: boolean;
  userEmail!: string;
  userPassword!: string;
  doUserExist: boolean = false;
  userId!: string | number;

  constructor(
    private formBuilder: FormBuilder,
    private service: GetUsersService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    this.userEmail = this.formulario.value.email;
    this.userPassword = this.formulario.value.password;
    this.isPasswordWrong = false;

    // Se o email for inválido:
    if (this.formulario.get('email')?.invalid) {
      this.isEmailInvalid = true;
    } else {
      // Se o email for válido
      this.isEmailInvalid = false;
    }

    // Se a senha passada for inválida
    if (this.formulario.get('password')?.invalid) {
      this.isPasswordInvalid = true;
    } else {
      // Se a senha passaada for válida
      this.isPasswordInvalid = false;
    }

    // Checa se email e senha são válidos:
    if (
      this.formulario.get('email')?.valid &&
      this.formulario.get('password')?.valid
    ) {
      // Retorna uma lista com os usuários com mesmo email -> Deve conter só 1 ou 0 itens
      this.service.getUsers().subscribe((users: any) => {
        const filterUsers: any[] = users.filter(
          (u: NewUserType) => u.email === this.userEmail
        );
        // Checa se o usuário existe
        if (filterUsers.length === 0) {
          // Se o usuário não existe:
          //TERMINAR ESSA PARTE
          console.log('usuário não existe');
        } else {
          //Se o usuário existe
          if (filterUsers.length > 0) {
            // Checa se o password está correto
            const isPasswordCorrect: boolean =
              filterUsers[0].password === this.userPassword;
            // Se password correto:
            if (isPasswordCorrect) {
              // Pega o id do usuário e redireciona para sua página
              this.userId = filterUsers[0].id;
              this.dataService.idChangeValue(this.userId);
              this.router.navigate([`/perfil/${this.userId}`]);
            }
            // Se password errado:
            if (!isPasswordCorrect) {
              // Diz mensagem de que o password está errado
              this.isPasswordWrong = true;
            }
          }
        }
      });
    }
  }
}
