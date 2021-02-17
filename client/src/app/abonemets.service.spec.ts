import { TestBed } from '@angular/core/testing';

import { AbonemetsService } from './services/abonemets.service';

describe('AbonemetsService', () => {
  let service: AbonemetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbonemetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
