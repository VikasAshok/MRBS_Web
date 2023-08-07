import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingroomlistComponent } from './meetingroomlist.component';

describe('MeetingroomlistComponent', () => {
  let component: MeetingroomlistComponent;
  let fixture: ComponentFixture<MeetingroomlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingroomlistComponent]
    });
    fixture = TestBed.createComponent(MeetingroomlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
