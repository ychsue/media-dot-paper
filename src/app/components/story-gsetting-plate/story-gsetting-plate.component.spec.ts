import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryGsettingPlateComponent } from './story-gsetting-plate.component';

describe('StoryGsettingPlateComponent', () => {
  let component: StoryGsettingPlateComponent;
  let fixture: ComponentFixture<StoryGsettingPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryGsettingPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryGsettingPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
