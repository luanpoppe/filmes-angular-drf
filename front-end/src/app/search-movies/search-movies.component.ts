import { filter } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GetMoviesService } from '../shared/get-movies.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss'],
})
export class SearchMoviesComponent implements OnInit {
  formulario!: FormGroup;
  baseUrlImages: any;
  moviesResult: any;
  moviesResult1: any = [];
  moviesResult2: any = [];
  moviesResult3: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: GetMoviesService
  ) {}

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

  addToWatchlist(movie: any) {}

  addToFavorites(movie: any) {}
}
