import { TestBed } from '@angular/core/testing';

import { GetMovieInfoService } from './get-movie-info.service';

describe('GetMovieInfoService', () => {
  let service: GetMovieInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMovieInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
