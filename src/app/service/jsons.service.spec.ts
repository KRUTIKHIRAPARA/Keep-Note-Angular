import { TestBed } from '@angular/core/testing';

import { JsonsService } from './jsons.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('JsonsService', () => {
  let service: JsonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers:[
        HttpClient,
      ]
    });
    service = TestBed.inject(JsonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
