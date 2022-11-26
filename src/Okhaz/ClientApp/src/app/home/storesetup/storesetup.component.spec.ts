import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresetupComponent } from './storesetup.component';

describe('StoresetupComponent', () => {
  let component: StoresetupComponent;
  let fixture: ComponentFixture<StoresetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
