import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, tap } from 'rxjs';
import { NewUserType } from 'src/utils/new-user-type';

@Injectable({
  providedIn: 'root',
})
export class GetMoviesService {
  watchlistMovies: any;
  favoritesMovies: any;

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    // accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDBmMzQ5MDQyZDVjNWY1ODA2YzBmNGU2NTA3NTRhYSIsInN1YiI6IjY1MTU4MWM0ZWE4NGM3MDE0ZWZhNGE4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c8KFYthyaGKtcFbBhpHqPXD0AFZvrXOjJPnwq2ABlDI',
  });

  getUpcomingMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1',
      {
        headers: this.headers,
      }
    );
  }

  getMovieConfiguration() {
    return this.http.get('https://api.themoviedb.org/3/configuration', {
      headers: this.headers,
    });
  }

  getUserWatchlist(userId: any) {
    return this.http.get('http://localhost:3000/usuarios').pipe(
      map((data: any) => {
        this.watchlistMovies = data.filter(
          (user: any) => parseInt(userId) === user.id
        )[0];
        this.watchlistMovies = this.watchlistMovies.watchlist;
        return this.watchlistMovies;
      })
    );
  }

  getUserFavorites(userId: any) {
    return this.http.get('http://localhost:3000/usuarios').pipe(
      map((data: any) => {
        this.favoritesMovies = data.filter(
          (user: any) => parseInt(userId) === user.id
        )[0];
        this.favoritesMovies = this.favoritesMovies.favorites;
        return this.favoritesMovies;
      })
    );
  }
}
