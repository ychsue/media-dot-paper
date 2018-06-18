import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeManiPlateComponent } from './me-mani-plate.component';

describe('MeManiPlateComponent', () => {
  let component: MeManiPlateComponent;
  let fixture: ComponentFixture<MeManiPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeManiPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeManiPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
