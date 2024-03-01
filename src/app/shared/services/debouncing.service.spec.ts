import { TestBed } from '@angular/core/testing';

import { DebouncingService } from './debouncing.service';

describe('DebouncingService', () => {
  let service: DebouncingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebouncingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
