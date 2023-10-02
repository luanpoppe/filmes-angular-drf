import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { NewUserType } from 'src/utils/new-user-type';

@Injectable({
  providedIn: 'root',
})
export class AddNewUserService {
  constructor(private http: HttpClient) {}

  addNewUser(novoAluno: NewUserType) {
    return this.http
      .post('http://localhost:3000/usuarios', novoAluno)
      .pipe(take(1));
  }
}
