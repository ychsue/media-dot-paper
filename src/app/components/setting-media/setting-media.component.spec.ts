import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingMediaComponent } from './setting-media.component';

describe('SettingMediaComponent', () => {
  let component: SettingMediaComponent;
  let fixture: ComponentFixture<SettingMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
