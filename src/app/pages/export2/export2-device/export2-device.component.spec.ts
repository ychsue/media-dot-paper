import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Export2DeviceComponent } from './export2-device.component';

describe('Export2DeviceComponent', () => {
  let component: Export2DeviceComponent;
  let fixture: ComponentFixture<Export2DeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Export2DeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Export2DeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
