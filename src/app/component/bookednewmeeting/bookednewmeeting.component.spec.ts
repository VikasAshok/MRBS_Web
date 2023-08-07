import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookednewmeetingComponent } from './bookednewmeeting.component';

describe('BookednewmeetingComponent', () => {
  let component: BookednewmeetingComponent;
  let fixture: ComponentFixture<BookednewmeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookednewmeetingComponent]
    });
    fixture = TestBed.createComponent(BookednewmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
