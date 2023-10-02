import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMoviesService } from 'src/app/shared/get-movies.service';
import { UserProfileComponent } from 'src/app/sections/user-profile/user-profile.component';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.scss'],
})
export class UpcomingMoviesComponent implements OnInit {
  listTite: string = 'Próximas estreias';
  upcomingMovies: any;
  baseUrlImages: any;
  inscricao!: any;
  isCollapsed: boolean = false;
  @Output() emitter = new EventEmitter<any>();

  constructor(
    private service: GetMoviesService,
    private userProfileComponent: UserProfileComponent,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Usando o Resolver
    this.inscricao = this.route.data.subscribe((info) => {
      this.upcomingMovies = info['upcomingMoviesResolver'];
      this.upcomingMovies = this.upcomingMovies.results.slice(0, 6);
    });

    // Pegando as configurações básicas para carregar imagens do API
    this.service.getMovieConfiguration().subscribe((data: any) => {
      this.baseUrlImages = data.images.base_url + data.images.backdrop_sizes[0];
    });

    // this.service.getUpcomingMovies().subscribe((data: any) => {
    //   this.upcomingMovies = data.results.slice(0, 6);
    // });
  }

  addToWatchlist(movie: any) {
    if (this.userProfileComponent.currentUser) {
      if (
        !this.userProfileComponent.currentUser.watchlist.some(
          (m) => m.id === movie.id
        )
      ) {
        this.userProfileComponent.addMovieInWatchlist(movie);
        this.emitter.emit(movie);
      }
    }
  }

  addToFavorites(movie: any) {
    if (this.userProfileComponent.currentUser) {
      if (
        !this.userProfileComponent.currentUser.favorites.some(
          (m) => m.id === movie.id
        )
      ) {
        this.userProfileComponent.addMovieInFavorites(movie);
        this.emitter.emit(movie);
      }
    }
  }
}
