import { TestBed, inject } from '@angular/core/testing';

import { GvService } from './gv.service';

describe('GvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GvService]
    });
  });

  it('should be created', inject([GvService], (service: GvService) => {
    expect(service).toBeTruthy();
  }));
});
