import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeMaskComponent } from './me-mask.component';

describe('MeMaskComponent', () => {
  let component: MeMaskComponent;
  let fixture: ComponentFixture<MeMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
