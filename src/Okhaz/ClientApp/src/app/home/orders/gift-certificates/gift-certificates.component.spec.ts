import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCertificatesComponent } from './gift-certificates.component';

describe('GiftCertificatesComponent', () => {
  let component: GiftCertificatesComponent;
  let fixture: ComponentFixture<GiftCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCertificatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
