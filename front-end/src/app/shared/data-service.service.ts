import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  iLoggedIn!: boolean;

  constructor() {}

  // Criando variável global de id
  private idSource = new BehaviorSubject<string | number | null>(null);

  idCurrentValue = this.idSource.asObservable();

  idChangeValue(newValue: any) {
    this.idSource.next(newValue);
  }

  // Método simples apenas para saber se o usuário está logado baseado no valor do id:
  isUserLoggedIn() {
    this.idCurrentValue.subscribe((data) => {
      if (data === null) {
        this.iLoggedIn = false;
      } else {
        this.iLoggedIn = true;
      }
      return this.iLoggedIn;
    });
    return this.iLoggedIn;
  }
}
