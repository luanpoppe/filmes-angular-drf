import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { UpcomingMoviesComponent } from './upcoming-movies/upcoming-movies.component';
import { WatchlistMoviesComponent } from './watchlist-movies/watchlist-movies.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FavoriteMoviesComponent,
    UpcomingMoviesComponent,
    WatchlistMoviesComponent,
  ],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [
    FavoriteMoviesComponent,
    UpcomingMoviesComponent,
    WatchlistMoviesComponent,
  ],
})
export class MovieListModule {}
