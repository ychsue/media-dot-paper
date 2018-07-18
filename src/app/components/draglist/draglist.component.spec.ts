import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraglistComponent } from './draglist.component';

describe('DraglistComponent', () => {
  let component: DraglistComponent;
  let fixture: ComponentFixture<DraglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
