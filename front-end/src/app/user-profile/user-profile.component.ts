import { Component, Input, OnInit } from '@angular/core';
import { AddNewUserService } from '../shared/add-new-user.service';
import { ActivatedRoute } from '@angular/router';
import { GetUsersService } from '../shared/get-users.service';
import { NewUserType } from 'src/utils/new-user-type';
import { AddMoviesService } from '../shared/add-movies.service';
import { GetMoviesService } from '../shared/get-movies.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  allUsers!: NewUserType[];
  currentUser!: NewUserType;
  id!: any;
  watchlistMovies!: any;

  constructor(
    private route: ActivatedRoute,
    private service: GetUsersService,
    private serviceAddMovies: AddMoviesService,
    private serviceGetMovies: GetMoviesService
  ) {}

  ngOnInit(): void {
    // Pega o id do usuário atual pelo parâmetro do URL
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log('O id do usuário atual é ' + this.id);

      // Retorna o objeto do usuário atual
      this.service.getUsers().subscribe((data: any) => {
        this.allUsers = data;
        this.currentUser = this.allUsers.filter(
          (u: NewUserType) => u.id == this.id
        )[0];
      });
    });
  }

  getUserWatchlist() {
    this.serviceGetMovies.getUserWatchlist(this.id).subscribe();
  }

  addMovieInWatchlist(movie: any) {
    this.currentUser.watchlist?.push(movie);

    this.serviceAddMovies.addMovie(this.currentUser, this.id).subscribe();
    console.log(this.currentUser);
  }

  addMovieInFavorites(movie: any) {
    this.currentUser.favorites?.push(movie);

    this.serviceAddMovies.addMovie(this.currentUser, this.id).subscribe();
    console.log(this.currentUser);
  }
}
