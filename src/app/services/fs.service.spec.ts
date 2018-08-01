import { TestBed, inject } from '@angular/core/testing';

import { FsService } from './fs.service';

describe('FsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FsService]
    });
  });

  it('should be created', inject([FsService], (service: FsService) => {
    expect(service).toBeTruthy();
  }));
});
