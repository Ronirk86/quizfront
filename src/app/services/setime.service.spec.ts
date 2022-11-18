import { TestBed } from '@angular/core/testing';

import { SetimeService } from './setime.service';

describe('SetimeService', () => {
  let service: SetimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
