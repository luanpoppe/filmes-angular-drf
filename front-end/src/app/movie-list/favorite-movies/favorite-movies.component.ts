import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMoviesService } from 'src/app/shared/get-movies.service';
import { GetUsersService } from 'src/app/shared/get-users.service';
import { RemoveMoviesService } from 'src/app/shared/remove-movies.service';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { NewUserType } from 'src/utils/new-user-type';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent implements OnInit {
  listTite: string = 'Seus favoritos';
  favoriteMovies: any = null;
  id: any;
  baseUrlImages!: string;
  allUsers!: NewUserType[];
  currentUser!: NewUserType;

  constructor(
    private route: ActivatedRoute,
    private userProfileComponent: UserProfileComponent,
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

    this.service.getUserFavorites(this.id).subscribe((data) => {
      this.favoriteMovies = data;
    });
  }

  removeFromFavorites(movie: any) {
    this.currentUser.favorites = this.currentUser.favorites?.filter(
      (m: any) => movie.id !== m.id
    );

    this.serviceRemoveMovies.deleteMovie(this.currentUser, this.id).subscribe();
  }

  addToWatchlist(filme: any) {
    this.userProfileComponent.addMovieInWatchlist(filme);
  }
}
