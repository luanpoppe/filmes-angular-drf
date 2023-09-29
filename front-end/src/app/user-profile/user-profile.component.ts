import { Component, Input, OnInit } from '@angular/core';
import { AddNewUserService } from '../shared/add-new-user.service';
import { ActivatedRoute } from '@angular/router';
import { GetUsersService } from '../shared/get-users.service';
import { NewUserType } from 'src/utils/new-user-type';
import { AddMoviesService } from '../shared/add-movies.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  allUsers!: NewUserType[];
  @Input() currentUser!: NewUserType;
  id!: any;

  constructor(
    private route: ActivatedRoute,
    private service: GetUsersService,
    private serviceAddMovies: AddMoviesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log('O id do usuário atual é ' + this.id);

      this.service.getUsers().subscribe((data: any) => {
        this.allUsers = data;
        this.currentUser = this.allUsers.filter(
          (u: NewUserType) => u.id == this.id
        )[0];
      });
    });
  }

  addMovieInWatchlist(filme: any) {
    this.currentUser.watchlist?.push(filme);
    this.serviceAddMovies.addToWatchlist(this.currentUser, this.id).subscribe();
    console.log(this.currentUser);
  }
}
