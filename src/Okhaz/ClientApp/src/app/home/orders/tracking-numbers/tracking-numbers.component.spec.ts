import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingNumbersComponent } from './tracking-numbers.component';

describe('TrackingNumbersComponent', () => {
  let component: TrackingNumbersComponent;
  let fixture: ComponentFixture<TrackingNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
