import { TestBed } from '@angular/core/testing';

import { DailySampleService } from './daily-sample.service';

describe('DailySampleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailySampleService = TestBed.inject(DailySampleService);
    expect(service).toBeTruthy();
  });
});
