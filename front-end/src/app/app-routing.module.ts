import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSectionComponent } from './main-section/main-section.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: NewUserComponent,
  },
  {
    path: 'pesquisar',
    component: SearchMoviesComponent,
  },
  {
    path: 'perfil/:id',
    component: UserProfileComponent,
  },
  {
    path: 'filme/:id',
    component: MoviePageComponent,
  },
  {
    path: '',
    component: MainSectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
