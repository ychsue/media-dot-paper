import { TestBed } from '@angular/core/testing';

import { MicRecorderService } from './mic-recorder.service';

describe('MicRecorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MicRecorderService = TestBed.inject(MicRecorderService);
    expect(service).toBeTruthy();
  });
});
