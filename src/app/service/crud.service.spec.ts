import { TestBed } from '@angular/core/testing';

import { CrudService } from './crud.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('CrudService', () => {
  let service: CrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers:[
        HttpClient,
      ]
    });
    service = TestBed.inject(CrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
