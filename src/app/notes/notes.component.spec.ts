import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';

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

    mockJsonService = jasmine.createSpyObj(['getAllTodos', 'addSingleTask', 'editList', 'deleteTodo']);
    component = new NotesComponent(mockToastrService, mockJsonService);

    await TestBed.configureTestingModule({
      declarations: [NotesComponent],
      imports: [
        ToastrModule.forRoot(),
        FormsModule,
        HttpClientModule,
        MatProgressBarModule
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
  // it('should get the all lists data', () => {
  //   mockJsonService.getAllTodos.and.returnValue(of(LISTS));
  //   component.todoDetails = LISTS;
  //   component.getAllTodos();
  //   expect(component.todoDetails).toBe(LISTS);
  // });

  // // Delete List
  // it('should remove the list', () => {
  //   mockJsonService.deleteTodo.and.returnValue(of(true));
  //   component.todoDetails = LISTS;
  //   component.deleteTodo(LISTS);
  //   expect(component.todoDetails.id).toBe(LISTS.id);
  // });

  // should be check enter new Todo @input placeholder 
  it('should be check enter new Todo @input placeholder', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.itemTitle').placeholder).toBe('Todo');
  });

  // should be check enter new Todo Item @input placeholder 
  it('should be check enter new Todo Item @input placeholder', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.newTodoItem').placeholder).toBe('List item');
  });

  // should be check search @input placeholder 
  it('should be check search @input placeholder', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#search').placeholder).toBe('Search');
  });


});
