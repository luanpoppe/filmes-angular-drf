import { filter } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GetMoviesService } from '../../shared/get-movies.service';
import { DataService } from '../../shared/data-service.service';
import { AddMoviesService } from '../../shared/add-movies.service';
import { GetUsersService } from '../../shared/get-users.service';
import { NewUserType } from 'src/utils/new-user-type';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss'],
})
export class SearchMoviesComponent implements OnInit {
  formulario!: FormGroup;
  baseUrlImages: any;
  moviesResult: any;
  userId!: any;
  toastMovieToWatchlist: boolean = false;
  toastMovieToFavorites: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: GetMoviesService,
    private dataService: DataService,
    private serviceAddMovie: AddMoviesService,
    private serviceGetUser: GetUsersService
  ) {
    // Pega a variável global que diz o id do usuário
    this.userId = this.dataService.getUserId();
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      search: [null],
    });

    // Pegando as configurações básicas para carregar imagens do API
    this.service.getMovieConfiguration().subscribe((data: any) => {
      this.baseUrlImages = data.images.base_url + data.images.backdrop_sizes[0];
    });
  }

  onSubmit() {
    this.service
      .getSearchedMovies(this.formulario.value.search)
      .subscribe((data: any) => {
        this.moviesResult = data.results.filter(
          (m: any) => m.backdrop_path !== null
        );
      });
  }

  addToWatchlistFromSearch(movie: any) {
    // Retorna o objeto do usuário atual
    this.serviceGetUser.getUsers().subscribe((data: any) => {
      const currentUser = data.find((u: NewUserType) => u.id == this.userId);

      // Adiciona o filme em questão ao objeto do usuário
      currentUser.watchlist.push(movie);

      // Envia o novo objeto do usuário atualizado para o servidor
      this.serviceAddMovie.addMovie(currentUser, this.userId).subscribe();

      // Faz o toast aparecer e depois sumir após 03 segundos
      this.toastMovieToWatchlist = true;
      setTimeout(() => {
        this.toastMovieToWatchlist = false;
      }, 3000);
    });
  }

  addToFavoritesFromSearch(movie: any) {
    // Retorna o objeto do usuário atual
    this.serviceGetUser.getUsers().subscribe((data: any) => {
      const currentUser = data.find((u: NewUserType) => u.id == this.userId);

      // Adiciona o filme em questão ao objeto do usuário
      currentUser.favorites.push(movie);

      // Envia o novo objeto do usuário atualizado para o servidor
      this.serviceAddMovie.addMovie(currentUser, this.userId).subscribe();

      // Faz o toast aparecer e depois sumir após 03 segundos
      this.toastMovieToFavorites = true;
      setTimeout(() => {
        this.toastMovieToFavorites = false;
      }, 3000);
    });
  }
}
