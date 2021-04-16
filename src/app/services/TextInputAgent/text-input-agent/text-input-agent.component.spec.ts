import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputAgentComponent } from './text-input-agent.component';

describe('TextInputAgentComponent', () => {
  let component: TextInputAgentComponent;
  let fixture: ComponentFixture<TextInputAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextInputAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
