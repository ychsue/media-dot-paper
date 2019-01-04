import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronunExerComponent } from './pronun-exer.component';

describe('PronunExerComponent', () => {
  let component: PronunExerComponent;
  let fixture: ComponentFixture<PronunExerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronunExerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronunExerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
