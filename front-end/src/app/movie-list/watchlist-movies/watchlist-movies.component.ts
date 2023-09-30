import { filter } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMoviesService } from 'src/app/shared/get-movies.service';
import { GetUsersService } from 'src/app/shared/get-users.service';
import { RemoveMoviesService } from 'src/app/shared/remove-movies.service';
import { NewUserType } from 'src/utils/new-user-type';

@Component({
  selector: 'app-watchlist-movies',
  templateUrl: './watchlist-movies.component.html',
  styleUrls: ['./watchlist-movies.component.scss'],
})
export class WatchlistMoviesComponent implements OnInit {
  listTite: string = 'Sua watchlist';
  watchlistMovies: any = null;
  id: any;
  baseUrlImages!: string;
  allUsers!: NewUserType[];
  currentUser!: NewUserType;

  constructor(
    private route: ActivatedRoute,
    private service: GetMoviesService,
    private serviceRemoveMovies: RemoveMoviesService,
    private serviceGetusers: GetUsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.serviceGetusers.getUsers().subscribe((data: any) => {
      this.allUsers = data;
      this.currentUser = this.allUsers.filter(
        (u: NewUserType) => u.id == this.id
      )[0];
    });

    this.service.getMovieConfiguration().subscribe((data: any) => {
      this.baseUrlImages = data.images.base_url + data.images.backdrop_sizes[0];
    });

    this.service.getUserWatchlist(this.id).subscribe((data) => {
      this.watchlistMovies = data;
      console.log(this.watchlistMovies);
    });
  }

  removeFromWatchlist(movie: any) {
    this.currentUser.watchlist = this.currentUser.watchlist?.filter(
      (m: any) => movie.id !== m.id
    );

    this.serviceRemoveMovies.deleteMovie(this.currentUser, this.id).subscribe();
  }
}
