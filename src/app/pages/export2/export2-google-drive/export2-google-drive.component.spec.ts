import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Export2GoogleDriveComponent } from './export2-google-drive.component';

describe('Export2GoogleDriveComponent', () => {
  let component: Export2GoogleDriveComponent;
  let fixture: ComponentFixture<Export2GoogleDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Export2GoogleDriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Export2GoogleDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
