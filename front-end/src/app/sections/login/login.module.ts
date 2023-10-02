import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LoginComponent } from './login.component';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieListModule } from 'src/app/movie-list/movie-list.module';

@NgModule({
  declarations: [UserProfileComponent, LoginComponent],
  exports: [UserProfileComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MovieListModule,
  ],
})
export class LoginModule {}
