import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvSettingsComponent } from './adv-settings.component';

describe('AdvSettingsComponent', () => {
  let component: AdvSettingsComponent;
  let fixture: ComponentFixture<AdvSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
