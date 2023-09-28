import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicoTesteService {
  constructor(private http: HttpClient) {}

  testeImdb() {
    this.http
      .get('https://imdb-api.com/en/API/Title/k_1234567/tt1832382')
      .subscribe((res) => console.log(res));
  }
}
