import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSectionComponent } from './main-section/main-section.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { GuardResolver } from './guards/guard-resolver';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      upcomingMoviesResolver: GuardResolver,
    },
  },
  {
    path: 'filme/:id',
    component: MoviePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: MainSectionComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
