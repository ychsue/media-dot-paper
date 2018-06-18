import { TestBed, inject } from '@angular/core/testing';

import { MediaEditService } from './media-edit.service';

describe('MediaEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaEditService]
    });
  });

  it('should be created', inject([MediaEditService], (service: MediaEditService) => {
    expect(service).toBeTruthy();
  }));
});
