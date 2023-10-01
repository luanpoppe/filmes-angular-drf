import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ListOfMovies } from 'src/utils/new-user-type';
import { GetMoviesService } from '../shared/get-movies.service';

@Injectable({
  providedIn: 'root',
})
export class GuardResolver implements Resolve<ListOfMovies> {
  listOfMovies!: any;

  constructor(private serviceGetMovies: GetMoviesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    console.log('O resolver funcionou');
    return this.serviceGetMovies.getUpcomingMovies();
  }
}
