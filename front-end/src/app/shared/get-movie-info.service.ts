import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetMovieInfoService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    // accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDBmMzQ5MDQyZDVjNWY1ODA2YzBmNGU2NTA3NTRhYSIsInN1YiI6IjY1MTU4MWM0ZWE4NGM3MDE0ZWZhNGE4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c8KFYthyaGKtcFbBhpHqPXD0AFZvrXOjJPnwq2ABlDI',
  });

  getMovieInfoById(movieId: string | number) {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/' + movieId + '?language=pt-BR',
      {
        headers: this.headers,
      }
    );
  }

  GetCastCrewById(movieId: string | number) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=pt-BR`,
      {
        headers: this.headers,
      }
    );
  }
}
