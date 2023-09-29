import { filter, map } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { GetMoviesService } from '../shared/get-movies.service';
import { AddMoviesService } from '../shared/add-movies.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  upcomingMovies: any;
  watchlistMovies: any;
  baseUrlImages: any;
  @Input() listTite!: string;
  @Input() getMovies: any;
  @Input() isWatchlist!: boolean;
  @Input() isUpcomingMovies!: boolean;
  @Input() isWatchlistMovies!: boolean;
  id!: any;

  constructor(
    private service: GetMoviesService,
    private serviceAddMovies: AddMoviesService,
    private route: ActivatedRoute,
    private userProfileComponent: UserProfileComponent
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    if (this.getMovies === 'upcomingMovies') {
      this.getUpcomingMovies();
    } else if (this.getMovies === 'userWatchlist') {
      this.getUserWatchlist();
    }

    this.service.getMovieConfiguration().subscribe((data: any) => {
      this.baseUrlImages = data.images.base_url + data.images.backdrop_sizes[0];
    });
  }

  addToWatchlist(filme: any) {
    this.userProfileComponent.addMovieInWatchlist(filme);
  }

  getUpcomingMovies() {
    this.service.getUpcomingMovies().subscribe((data: any) => {
      this.upcomingMovies = data.results.slice(0, 6);
    });
  }

  getUserWatchlist() {
    this.service.getUserWatchlist().subscribe((data: any) => {
      this.watchlistMovies = data.filter(
        (user: any) => parseInt(this.id) === user.id
      )[0];
      this.watchlistMovies = this.watchlistMovies.watchlist;
    });
  }
}
