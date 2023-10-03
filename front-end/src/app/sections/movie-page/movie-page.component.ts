import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMovieInfoService } from '../../shared/get-movie-info.service';
import {
  CastAndCrewInfo,
  MovieInfo,
  NewUserType,
} from 'src/utils/new-user-type';
import { GetMoviesService } from '../../shared/get-movies.service';
import { DataService } from '../../shared/data-service.service';
import { GetUsersService } from '../../shared/get-users.service';
import { AddMoviesService } from '../../shared/add-movies.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
  id: any;
  movieInfo!: MovieInfo;
  baseUrlImages!: any;
  userId!: any;
  allUsers!: NewUserType[];
  currentUser!: NewUserType;

  movieTitle!: string;
  movieOriginalTitle!: string;
  movieLaunchYear!: string;
  movieOverview!: string;
  moviePosterPath!: string;

  castAndCrew!: CastAndCrewInfo;
  director!: string;

  constructor(
    private route: ActivatedRoute,
    private service: GetMovieInfoService,
    private serviceGetMovieImage: GetMoviesService,
    private dataService: DataService,
    private serviceGetUser: GetUsersService,
    private serviceAddMovie: AddMoviesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.service.getMovieInfoById(this.id)?.subscribe((data: any) => {
      this.movieInfo = data;
      this.movieTitle = this.movieInfo.title;
      this.movieOriginalTitle = this.movieInfo.original_title;
      this.movieLaunchYear = this.movieInfo.release_date.split('-')[0];
      this.movieOverview = this.movieInfo.overview;
      this.moviePosterPath = this.movieInfo.poster_path;
    });

    this.service.GetCastCrewById(this.id).subscribe((data: any) => {
      this.castAndCrew = data;
      this.director = this.castAndCrew.crew.filter(
        (c) => c.job === 'Director'
      )[0].original_name;
    });

    this.serviceGetMovieImage.getMovieConfiguration().subscribe((data: any) => {
      this.baseUrlImages = data.images.base_url + data.images.backdrop_sizes[0];
    });
  }

  addToWatchlistFromSearch(movie: any) {
    // Pega a variável global que diz o id do usuário
    this.dataService.idCurrentValue.subscribe((id) => {
      this.userId = id;
      // Retorna o objeto do usuário atual
      this.serviceGetUser.getUsers().subscribe((data: any) => {
        this.allUsers = data;
        this.currentUser = this.allUsers.filter(
          (u: NewUserType) => u.id == this.userId
        )[0];

        // Adiciona o filme em questão ao objeto do usuário
        this.currentUser.watchlist.push(movie);

        // Envia o novo objeto do usuário atualizado para o servidor
        this.serviceAddMovie
          .addMovie(this.currentUser, this.userId)
          .subscribe();
      });
    });
  }

  addToFavoritesFromSearch(movie: any) {
    // Pega a variável global que diz o id do usuário
    this.dataService.idCurrentValue.subscribe((id) => {
      this.userId = id;
      // Retorna o objeto do usuário atual
      this.serviceGetUser.getUsers().subscribe((data: any) => {
        this.allUsers = data;
        this.currentUser = this.allUsers.filter(
          (u: NewUserType) => u.id == this.userId
        )[0];

        // Adiciona o filme em questão ao objeto do usuário
        this.currentUser.favorites.push(movie);

        // Envia o novo objeto do usuário atualizado para o servidor
        this.serviceAddMovie
          .addMovie(this.currentUser, this.userId)
          .subscribe();
      });
    });
  }
}
