import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeMainDashboardComponent } from './me-main-dashboard.component';

describe('MeMainDashboardComponent', () => {
  let component: MeMainDashboardComponent;
  let fixture: ComponentFixture<MeMainDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeMainDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeMainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
