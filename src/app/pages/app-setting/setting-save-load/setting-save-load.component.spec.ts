import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSaveLoadComponent } from './setting-save-load.component';

describe('SettingSaveLoadComponent', () => {
  let component: SettingSaveLoadComponent;
  let fixture: ComponentFixture<SettingSaveLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingSaveLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSaveLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
