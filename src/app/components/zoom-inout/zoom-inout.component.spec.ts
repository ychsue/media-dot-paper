import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomInoutComponent } from './zoom-inout.component';

describe('ZoomInoutComponent', () => {
  let component: ZoomInoutComponent;
  let fixture: ComponentFixture<ZoomInoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomInoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomInoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
