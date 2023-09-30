import { Component, OnInit } from '@angular/core';
import { GetMoviesService } from 'src/app/shared/get-movies.service';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.scss'],
})
export class UpcomingMoviesComponent implements OnInit {
  listTite: string = 'Próximas estreias';
  upcomingMovies: any;
  baseUrlImages: any;

  constructor(
    private service: GetMoviesService,
    private userProfileComponent: UserProfileComponent
  ) {}

  ngOnInit(): void {
    this.service.getMovieConfiguration().subscribe((data: any) => {
      this.baseUrlImages = data.images.base_url + data.images.backdrop_sizes[0];
    });

    this.service.getUpcomingMovies().subscribe((data: any) => {
      this.upcomingMovies = data.results.slice(0, 6);
    });
  }

  addToWatchlist(filme: any) {
    this.userProfileComponent.addMovieInWatchlist(filme);
  }

  addToFavorites(filme: any) {
    this.userProfileComponent.addMovieInFavorites(filme);
  }
}
