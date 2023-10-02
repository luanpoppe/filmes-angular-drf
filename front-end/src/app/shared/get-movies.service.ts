import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, take, tap } from 'rxjs';
import { NewUserType } from 'src/utils/new-user-type';

@Injectable({
  providedIn: 'root',
})
export class GetMoviesService {
  favoritesMovies: any;

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    // accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDBmMzQ5MDQyZDVjNWY1ODA2YzBmNGU2NTA3NTRhYSIsInN1YiI6IjY1MTU4MWM0ZWE4NGM3MDE0ZWZhNGE4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c8KFYthyaGKtcFbBhpHqPXD0AFZvrXOjJPnwq2ABlDI',
  });

  getUpcomingMovies() {
    return this.http
      .get(
        'https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1',
        {
          headers: this.headers,
        }
      )
      .pipe(take(1));
  }

  getMovieConfiguration() {
    return this.http
      .get('https://api.themoviedb.org/3/configuration', {
        headers: this.headers,
      })
      .pipe(take(1));
  }

  getUserWatchlist(userId: any) {
    return this.http
      .get('http://localhost:3000/usuarios')
      .pipe(
        map((data: any) => {
          const watchlist = data.find(
            (user: any) => parseInt(userId) === user.id
          )?.watchlist;
          return watchlist;
        })
      )
      .pipe(take(1));
  }

  getUserFavorites(userId: any) {
    return this.http
      .get('http://localhost:3000/usuarios')
      .pipe(
        map((data: any) => {
          this.favoritesMovies = data.filter(
            (user: any) => parseInt(userId) === user.id
          )[0];
          this.favoritesMovies = this.favoritesMovies.favorites;
          return this.favoritesMovies;
        })
      )
      .pipe(take(1));
  }

  getSearchedMovies(movieSearched: string | number) {
    return this.http
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${movieSearched}&include_adult=false&language=en-US&page=1`,
        {
          headers: this.headers,
        }
      )
      .pipe(take(1));
  }
}
