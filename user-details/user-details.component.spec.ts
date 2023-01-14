import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetails } from './user-details.component'
describe('UserDetailsComponent', () => {
  let component: UserDetails;
  let fixture: ComponentFixture<UserDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetails ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
