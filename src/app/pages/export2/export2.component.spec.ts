import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Export2Component } from './export2.component';

describe('Export2Component', () => {
  let component: Export2Component;
  let fixture: ComponentFixture<Export2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Export2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Export2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
