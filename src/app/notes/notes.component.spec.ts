import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let LISTS;
  let mockToastrService;
  let mockJsonService;

  beforeEach(async () => { 

    LISTS = [
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
    
    mockJsonService = jasmine.createSpyObj(['getAllList','addNewList','editList','deleteList']);
    component =  new NotesComponent(mockToastrService,mockJsonService);

    await TestBed.configureTestingModule({
      declarations: [ NotesComponent ],
      imports:[
        ToastrModule.forRoot(),
        FormsModule,
        HttpClientModule
      ],
      providers:[
        HttpClient,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Get Lists
  it('should get the all lists data',()=>{
    mockJsonService.getAllList.and.returnValue(of(LISTS));
    component.getlistArray = LISTS;
    component.getAllList();
    expect(component.getlistArray).toBe(LISTS);
  });

  // Add List
  it('should add the list',()=>{
    mockJsonService.addNewList.and.returnValue(of(true));
    component.getlistArray = LISTS;
    component.addNewList();
    expect(component.getlistArray).toBe(LISTS);
  });

  // Delete List
  it('should remove the list',()=>{
    mockJsonService.deleteList.and.returnValue(of(true));
    component.getlistArray = LISTS;
    component.deleteList(LISTS);
    expect(component.getlistArray.id).toBe(LISTS.id);
  });
});
