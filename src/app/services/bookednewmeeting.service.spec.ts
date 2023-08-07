import { TestBed } from '@angular/core/testing';

import { BookednewmeetingService } from './bookednewmeeting.service';

describe('BookednewmeetingService', () => {
  let service: BookednewmeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookednewmeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
