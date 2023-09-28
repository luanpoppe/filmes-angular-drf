import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null],
      password: [null],
    });
  }

  onSubmit() {
    console.log(this.formulario.value);
  }

  chamadaHttpteste() {
    this.http
      .get('https://imdb-api.com/en/API/SearchTitle/k_12345678/inception 2010')
      .subscribe((res) => console.log(res));
  }
}
