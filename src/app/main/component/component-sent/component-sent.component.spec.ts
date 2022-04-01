import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSentComponent } from './component-sent.component';

describe('ComponentSentComponent', () => {
  let component: ComponentSentComponent;
  let fixture: ComponentFixture<ComponentSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
