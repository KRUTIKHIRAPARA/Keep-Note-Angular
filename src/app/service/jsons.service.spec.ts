import { TestBed } from '@angular/core/testing';

import { JsonsService } from './jsons.service';

describe('JsonsService', () => {
  let service: JsonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
