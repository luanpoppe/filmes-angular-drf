import { filter } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMoviesService } from 'src/app/shared/get-movies.service';
import { GetUsersService } from 'src/app/shared/get-users.service';
import { RemoveMoviesService } from 'src/app/shared/remove-movies.service';
import { NewUserType } from 'src/utils/new-user-type';
import { UserProfileComponent } from 'src/app/sections/user-profile/user-profile.component';
import { DataService } from 'src/app/shared/data-service.service';

@Component({
  selector: 'app-watchlist-movies',
  templateUrl: './watchlist-movies.component.html',
  styleUrls: ['./watchlist-movies.component.scss'],
})
export class WatchlistMoviesComponent implements OnInit, OnChanges {
  listTite: string = 'Sua watchlist';
  watchlistMovies: any = null;
  id: any;
  baseUrlImages: string = 'https://image.tmdb.org/t/p/w500/';
  allUsers!: NewUserType[];
  currentUser!: NewUserType;
  @Input() newMovie: any = null;
  @Output() emitter = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private service: GetMoviesService,
    private serviceRemoveMovies: RemoveMoviesService,
    private serviceGetusers: GetUsersService,
    private userProfileComponent: UserProfileComponent,
    private dataService: DataService
  ) {}

  ngOnChanges(): void {
    this.getWatchlist();
  }

  ngOnInit(): void {
    // Pegar o ID do usuário do Local Storage
    this.id = this.dataService.getUserId();

    // Retorna o usuário do id informado
    this.getUserInfo();

    // this.service.getMovieConfiguration().subscribe((data: any) => {
    //   this.baseUrlImages = data.images.base_url + data.images.backdrop_sizes[0];
    // });
  }

  removeFromWatchlist(movie: any) {
    // Atualiza a lista de watchlist do usuário para não conter o filme em questão
    this.currentUser.watchlist = this.currentUser.watchlist?.filter(
      (m: any) => movie.id !== m.id
    );

    this.serviceRemoveMovies
      .deleteMovie(this.currentUser, this.id)
      .subscribe((data: any) => {
        this.watchlistMovies = this.currentUser.watchlist;
        this.emitter.emit(this.currentUser);
      });
  }

  addToFavorites(movie: any) {
    this.userProfileComponent.addMovieInFavorites(movie);
  }

  getUserInfo() {
    this.serviceGetusers.getUsers().subscribe((data: any) => {
      this.currentUser = data.find((u: NewUserType) => u.id == this.id);
      this.watchlistMovies = this.currentUser.watchlist;
      console.log(this.watchlistMovies);
    });
  }

  getWatchlist() {
    this.service.getUserWatchlist(this.id).subscribe((data) => {
      if (this.currentUser) {
        this.currentUser.watchlist = data;
        this.watchlistMovies = this.currentUser.watchlist;
      }
    });
  }
}
