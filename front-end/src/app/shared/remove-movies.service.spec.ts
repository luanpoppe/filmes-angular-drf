import { TestBed } from '@angular/core/testing';

import { RemoveMoviesService } from './remove-movies.service';

describe('RemoveMoviesService', () => {
  let service: RemoveMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
