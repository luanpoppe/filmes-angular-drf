import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMoviesService } from 'src/app/shared/get-movies.service';
import { GetUsersService } from 'src/app/shared/get-users.service';
import { RemoveMoviesService } from 'src/app/shared/remove-movies.service';
import { UserProfileComponent } from 'src/app/sections/user-profile/user-profile.component';
import { NewUserType } from 'src/utils/new-user-type';
import { DataService } from 'src/app/shared/data-service.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent implements OnInit, OnChanges {
  listTite: string = 'Seus favoritos';
  favoriteMovies: any = null;
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
    this.getFavorites();
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

  removeFromFavorites(movie: any) {
    // Atualiza a lista de favoritos do usuário para não conter o filme em questão
    this.currentUser.favorites = this.currentUser.favorites?.filter(
      (m: any) => movie.id !== m.id
    );

    this.serviceRemoveMovies
      .deleteMovie(this.currentUser, this.id)
      .subscribe((data: any) => {
        this.favoriteMovies = this.currentUser.favorites;
        this.emitter.emit(this.currentUser);
      });
  }

  addToWatchlist(movie: any) {
    this.userProfileComponent.addMovieInWatchlist(movie);
  }

  getUserInfo() {
    this.serviceGetusers.getUsers().subscribe((data: any) => {
      this.currentUser = data.find((u: NewUserType) => u.id == this.id);
      this.favoriteMovies = this.currentUser.favorites;
    });
  }

  getFavorites() {
    this.service.getUserFavorites(this.id).subscribe((data) => {
      if (this.currentUser) {
        this.currentUser.favorites = data;
        this.favoriteMovies = this.currentUser.favorites;
      }
    });
  }
}
