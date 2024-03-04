import { TestBed } from '@angular/core/testing';

import { ShortUuidService } from './short-uuid.service';

describe('ShortUuidService', () => {
  let service: ShortUuidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortUuidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
