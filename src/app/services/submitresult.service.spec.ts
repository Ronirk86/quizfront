import { TestBed } from '@angular/core/testing';

import { SubmitresultService } from './submitresult.service';

describe('SubmitresultService', () => {
  let service: SubmitresultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitresultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
