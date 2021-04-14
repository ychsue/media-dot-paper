import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithClickComponent } from './with-click.component';

describe('WithClickComponent', () => {
  let component: WithClickComponent;
  let fixture: ComponentFixture<WithClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithClickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
