import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeadComponent } from './chande-ad.component';

describe('ChandeAdComponent', () => {
  let component: ChangeadComponent;
  let fixture: ComponentFixture<ChangeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
