import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('http://localhost:3000/usuarios').pipe(take(1));
  }
}
