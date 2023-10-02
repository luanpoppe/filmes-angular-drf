import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSectionComponent } from './sections/main-section/main-section.component';
import { NewUserComponent } from './sections/new-user/new-user.component';
import { UserProfileComponent } from './sections/user-profile/user-profile.component';
import { MoviePageComponent } from './sections/movie-page/movie-page.component';
import { SearchMoviesComponent } from './sections/search-movies/search-movies.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { GuardResolver } from './guards/guard-resolver';
import { LoginComponent } from './sections/login/login.component';

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
