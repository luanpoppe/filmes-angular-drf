import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMovieInfoService } from '../shared/get-movie-info.service';
import { CastAndCrewInfo, MovieInfo } from 'src/utils/new-user-type';
import { GetMoviesService } from '../shared/get-movies.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
  id: any;
  movieInfo!: MovieInfo;
  baseUrlImages!: any;

  movieTitle!: string;
  movieOriginalTitle!: string;
  movieLaunchYear!: string;
  movieOverview!: string;

  castAndCrew!: CastAndCrewInfo;
  director!: string;

  constructor(
    private route: ActivatedRoute,
    private service: GetMovieInfoService,
    private serviceGetMovieImage: GetMoviesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.service.getMovieInfoById(this.id).subscribe((data: any) => {
      this.movieInfo = data;
      this.movieTitle = this.movieInfo.title;
      this.movieOriginalTitle = this.movieInfo.original_title;
      this.movieLaunchYear = this.movieInfo.release_date.split('-')[0];
      this.movieOverview = this.movieInfo.overview;
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
}
