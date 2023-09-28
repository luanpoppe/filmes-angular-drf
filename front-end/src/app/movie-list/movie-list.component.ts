import { Component, OnInit } from '@angular/core';
import { GetMoviesService } from '../shared/get-movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  upcomingMovies: any;
  baseUrlImages: any;

  constructor(private service: GetMoviesService) {}

  ngOnInit(): void {
    this.service.getUpcomingMovies().subscribe((data: any) => {
      this.upcomingMovies = data.results.slice(0, 6);
    });

    this.service.getMovieConfiguration().subscribe((data: any) => {
      this.baseUrlImages = data.images.base_url + data.images.backdrop_sizes[0];
      console.log(this.baseUrlImages);
    });
  }
}
