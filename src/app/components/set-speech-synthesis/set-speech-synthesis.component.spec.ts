import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSpeechSynthesisComponent } from './set-speech-synthesis.component';

describe('SetSpeechSynthesisComponent', () => {
  let component: SetSpeechSynthesisComponent;
  let fixture: ComponentFixture<SetSpeechSynthesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSpeechSynthesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSpeechSynthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
