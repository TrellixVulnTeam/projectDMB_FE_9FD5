import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountPage2Component } from './create-account-page2.component';

describe('CreateAccountPage2Component', () => {
  let component: CreateAccountPage2Component;
  let fixture: ComponentFixture<CreateAccountPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountPage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
