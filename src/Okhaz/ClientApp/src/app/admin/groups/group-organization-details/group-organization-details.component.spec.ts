import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOrganizationDetailsComponent } from './group-organization-details.component';

describe('GroupOrganizationDetailsComponent', () => {
  let component: GroupOrganizationDetailsComponent;
  let fixture: ComponentFixture<GroupOrganizationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupOrganizationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupOrganizationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
