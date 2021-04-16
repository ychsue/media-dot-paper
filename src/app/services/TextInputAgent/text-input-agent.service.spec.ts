import { TestBed } from '@angular/core/testing';

import { TextInputAgentService } from './text-input-agent.service';

describe('TextInputAgentService', () => {
  let service: TextInputAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextInputAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
