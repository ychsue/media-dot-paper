import { TestBed } from '@angular/core/testing';

import { Gv2googleService } from './gv2google.service';

describe('Gv2googleService', () => {
  let service: Gv2googleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gv2googleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
