import { TestBed, inject } from '@angular/core/testing';

import { PageTextsService } from './page-texts.service';

describe('PageTextsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageTextsService]
    });
  });

  it('should be created', inject([PageTextsService], (service: PageTextsService) => {
    expect(service).toBeTruthy();
  }));
});
