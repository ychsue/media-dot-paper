import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSignIoComponent } from './google-sign-io.component';

describe('GoogleSignIoComponent', () => {
  let component: GoogleSignIoComponent;
  let fixture: ComponentFixture<GoogleSignIoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleSignIoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSignIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
