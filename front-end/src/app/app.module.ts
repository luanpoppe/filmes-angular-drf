import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainSectionComponent } from './sections/main-section/main-section.component';
import { NewUserComponent } from './sections/new-user/new-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MoviePageComponent } from './sections/movie-page/movie-page.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SearchMoviesComponent } from './sections/search-movies/search-movies.component';
import { LoginModule } from './sections/login/login.module';
import { ComponentsModule } from './components/components.module';
import { MovieListModule } from './movie-list/movie-list.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
