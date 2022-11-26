import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelGameDetailComponent } from './wheel-game-detail.component';

describe('WheelGameDetailComponent', () => {
  let component: WheelGameDetailComponent;
  let fixture: ComponentFixture<WheelGameDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WheelGameDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelGameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
