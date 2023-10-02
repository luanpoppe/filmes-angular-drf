import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  iLoggedIn!: boolean;
  // Criando variável global de id
  private idSource = new BehaviorSubject<string | number | null>(null);

  constructor() {
    this.idSource = new BehaviorSubject<any>(localStorage.getItem('userId'));
  }

  idCurrentValue = this.idSource.asObservable();

  idChangeValue(newValue: any) {
    localStorage.setItem('userId', newValue);
    this.idSource.next(newValue);
  }

  getUserId() {
    return this.idSource.value;
  }

  // Método simples apenas para saber se o usuário está logado baseado no valor do id:
  isUserLoggedIn() {
    if (this.getUserId()) {
      return true;
    }
    return false;
  }
}
