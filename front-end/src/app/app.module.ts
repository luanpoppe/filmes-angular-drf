import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonMainComponent } from './button-main/button-main.component';
import { SectionsTitleComponent } from './sections-title/sections-title.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GetMoviesService } from './shared/get-movies.service';
import { SubTitlesComponent } from './sub-titles/sub-titles.component';
import { UpcomingMoviesComponent } from './movie-list/upcoming-movies/upcoming-movies.component';
import { WatchlistMoviesComponent } from './movie-list/watchlist-movies/watchlist-movies.component';
import { FavoriteMoviesComponent } from './movie-list/favorite-movies/favorite-movies.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { InputInvalidComponent } from './input-invalid/input-invalid.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainSectionComponent,
    LoginComponent,
    NewUserComponent,
    ButtonMainComponent,
    SectionsTitleComponent,
    UserProfileComponent,
    SubTitlesComponent,
    UpcomingMoviesComponent,
    WatchlistMoviesComponent,
    FavoriteMoviesComponent,
    MoviePageComponent,
    InputInvalidComponent,
    AlertSuccessComponent,
    SearchMoviesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PopoverModule.forRoot(),
  ],
  providers: [GetMoviesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
