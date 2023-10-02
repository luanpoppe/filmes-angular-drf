import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainSectionComponent } from './sections/main-section/main-section.component';
import { NewUserComponent } from './sections/new-user/new-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonMainComponent } from './components/button-main/button-main.component';
import { HttpClientModule } from '@angular/common/http';
import { GetMoviesService } from './shared/get-movies.service';
import { SubTitlesComponent } from './components/sub-titles/sub-titles.component';
import { MoviePageComponent } from './sections/movie-page/movie-page.component';
import { InputInvalidComponent } from './components/input-invalid/input-invalid.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AlertSuccessComponent } from './components/alert-success/alert-success.component';
import { SearchMoviesComponent } from './sections/search-movies/search-movies.component';
import { UpcomingMoviesComponent } from './movie-list/upcoming-movies/upcoming-movies.component';
import { WatchlistMoviesComponent } from './movie-list/watchlist-movies/watchlist-movies.component';
import { FavoriteMoviesComponent } from './movie-list/favorite-movies/favorite-movies.component';
import { UserProfileComponent } from './sections/user-profile/user-profile.component';
import { SectionsTitleComponent } from './components/sections-title/sections-title.component';
import { LoginModule } from './sections/login/login.module';
import { LoginComponent } from './sections/login/login.component';
import { ComponentsModule } from './components/components.module';
import { MovieListModule } from './movie-list/movie-list.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainSectionComponent,
    NewUserComponent,
    MoviePageComponent,
    SearchMoviesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PopoverModule.forRoot(),
    ComponentsModule,
    LoginModule,
    MovieListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
