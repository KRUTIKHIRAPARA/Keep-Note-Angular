import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { JsonsService, Tasks } from '../service/jsons.service';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let LISTS;
  let mockToastrService;
  let mockJsonService;

  beforeEach(async () => {

    LISTS = [
      {
        tasks: [
          {
            id: 2,
            todoId: 50,
            isCompleted: false,
            name: "Create CRUD"
          },
          {
            id: 2,
            todoId: 50,
            isCompleted: true,
            name: "UI To-do List App"
          }
        ],
        addedon: "2023-05-16T04:45:50.470Z",
        name: "Work",
        id: 2
      }
    ];

    mockJsonService = jasmine.createSpyObj(['getAllList', 'addNewList', 'editList', 'deleteList']);
    component = new NotesComponent(mockToastrService, mockJsonService);

    await TestBed.configureTestingModule({
      declarations: [NotesComponent],
      imports: [
        ToastrModule.forRoot(),
        FormsModule,
        HttpClientModule
      ],
      providers: [
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
  it('should get the all lists data', () => {
    mockJsonService.getAllList.and.returnValue(of(LISTS));
    component.todoDetails = LISTS;
    component.getAllList();
    expect(component.todoDetails).toBe(LISTS);
  });

  // Add List
  it('should add the list', () => {
    mockJsonService.addNewList.and.returnValue(of(true));
    component.todoDetails = LISTS;
    component.addNewList();
    expect(component.todoDetails).toBe(LISTS);
  });

  // Delete List
  it('should remove the list', () => {
    mockJsonService.deleteList.and.returnValue(of(true));
    component.todoDetails = LISTS;
    component.deleteList(LISTS);
    expect(component.todoDetails.id).toBe(LISTS.id);
  });

  // should be check enter new Todo @input placeholder 
  it('should be check enter new Todo @input placeholder', () => {
    fixture.detectChanges(); // 2
    const compiled = fixture.debugElement.nativeElement; // 2
    expect(compiled.querySelector('.itemTitle').placeholder).toBe('Title'); // 3
  });

  // should be check enter new Todo Item @input placeholder 
  it('should be check enter new Todo Item @input placeholder', () => {
    const compiled = fixture.debugElement.nativeElement; // 2
    expect(compiled.querySelector('.newTodoItem').placeholder).toBe('List item'); // 3
  });

  // should be check search @input placeholder 
  it('should be check search @input placeholder', () => {
    const compiled = fixture.debugElement.nativeElement; // 2
    expect(compiled.querySelector('#search').placeholder).toBe('Search'); // 3
  });


});
