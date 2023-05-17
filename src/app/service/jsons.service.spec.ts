import { TestBed } from '@angular/core/testing';

import { JsonsService } from './jsons.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('JsonsService', () => {
  let jsonService: JsonsService;
  let mockHttpClient;

  beforeEach(() => {

    jsonService =  new JsonsService(mockHttpClient);

    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers:[
        HttpClient,
      ]
    });
    jsonService = TestBed.inject(JsonsService);

  });

  it('should be created', () => {
    expect(jsonService).toBeTruthy();
  });

  // Check GET method are return respose is valid or not
  it('should be return list datas', () => {
    let mockResponse = [
      {
        taskItems: [
          {
            isCompleted: false,
            item: "Create CRUD"
          },
          {
            isCompleted: true,
            item: "UI To-do List App"
          }
        ],
        date: "2023-05-16T04:45:50.470Z",
        taskName: "Work",
        id: 2
      }
    ];

    let respose;
    spyOn(jsonService,'getListData').and.returnValue(of(mockResponse));
    jsonService.getListData().subscribe(res => {respose = res})

    expect(respose).toEqual(mockResponse);
  });

});
