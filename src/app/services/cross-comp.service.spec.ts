import { TestBed, inject } from '@angular/core/testing';

import { CrossCompService } from './cross-comp.service';

describe('CrossCompService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrossCompService]
    });
  });

  it('should be created', inject([CrossCompService], (service: CrossCompService) => {
    expect(service).toBeTruthy();
  }));
});
