import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeSectionDashboardComponent } from './me-section-dashboard.component';

describe('MeSectionDashboardComponent', () => {
  let component: MeSectionDashboardComponent;
  let fixture: ComponentFixture<MeSectionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeSectionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeSectionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
