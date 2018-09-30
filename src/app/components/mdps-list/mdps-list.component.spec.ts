import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpsListComponent } from './mdps-list.component';

describe('MdpsListComponent', () => {
  let component: MdpsListComponent;
  let fixture: ComponentFixture<MdpsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdpsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdpsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
