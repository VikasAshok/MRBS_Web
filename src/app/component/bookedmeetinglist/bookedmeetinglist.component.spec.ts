import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedmeetinglistComponent } from './bookedmeetinglist.component';

describe('BookedmeetinglistComponent', () => {
  let component: BookedmeetinglistComponent;
  let fixture: ComponentFixture<BookedmeetinglistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookedmeetinglistComponent]
    });
    fixture = TestBed.createComponent(BookedmeetinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
