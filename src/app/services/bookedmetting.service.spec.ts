import { TestBed } from '@angular/core/testing';

import { BookedmettingService } from './bookedmetting.service';

describe('BookedmettingService', () => {
  let service: BookedmettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedmettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
