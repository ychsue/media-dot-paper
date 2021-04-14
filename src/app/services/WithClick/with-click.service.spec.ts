import { TestBed } from '@angular/core/testing';

import { WithClickService } from './with-click.service';

describe('WithClickService', () => {
  let service: WithClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
