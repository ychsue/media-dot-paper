import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySampleComponent } from './daily-sample.component';

describe('DailySampleComponent', () => {
  let component: DailySampleComponent;
  let fixture: ComponentFixture<DailySampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
