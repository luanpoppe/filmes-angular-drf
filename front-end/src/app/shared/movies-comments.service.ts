import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesCommentsService {
  constructor(private http: HttpClient) {}

  getMovieComment() {
    return this.http.get('http://localhost:3000/comentarios').pipe(take(1));
  }

  addMovieComment(comments: any, movieId: any) {
    return this.http
      .put(`http://localhost:3000/comentarios/${movieId}`, comments)
      .pipe(take(1));
  }

  // Função chamada se a página de filmes ainda não tiver comentários
  addMovieCommentNew(comments: any) {
    return this.http
      .post(`http://localhost:3000/comentarios/`, comments)
      .pipe(take(1));
  }
}
