import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelYoutubeCaptionDialogComponent } from './sel-youtube-caption-dialog.component';

describe('SelYoutubeCaptionDialogComponent', () => {
  let component: SelYoutubeCaptionDialogComponent;
  let fixture: ComponentFixture<SelYoutubeCaptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelYoutubeCaptionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelYoutubeCaptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
