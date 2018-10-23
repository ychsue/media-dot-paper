import { TestBed, inject } from '@angular/core/testing';

import { SbvService } from './sbv.service';

describe('SbvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SbvService]
    });
  });

  it('should be created', inject([SbvService], (service: SbvService) => {
    expect(service).toBeTruthy();
  }));
});
