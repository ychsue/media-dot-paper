import { TestBed } from '@angular/core/testing';

import { MySwUpdateService } from './my-sw-update.service';

describe('MySwUpdateService', () => {
  let service: MySwUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySwUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
