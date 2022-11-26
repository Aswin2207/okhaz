import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSupplierComponent } from './categories-supplier.component';

describe('CategoriesSupplierComponent', () => {
  let component: CategoriesSupplierComponent;
  let fixture: ComponentFixture<CategoriesSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
