import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

describe('TodosComponent', () => {
  
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let TODOS;
  let mockToastrService;
  let mockTodoService;
  let mockMethods;

  beforeEach(async () => {

    TODOS = [
      {
        tasks: [
          {
            id: 2,
            todoId: 50,
            isCompleted: false,
            name: "Create CRUD"
          },
          {
            id: 3,
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

    mockMethods = jasmine.createSpyObj(['fetchAllTodos', 'addSingleTask', 'updateTodo', 'deleteTodo']);
    component = new TodosComponent(mockToastrService, mockTodoService);

    await TestBed.configureTestingModule({
      declarations: [TodosComponent],
      imports: [
        ToastrModule.forRoot(),
        FormsModule,
        HttpClientModule,
        MatProgressBarModule,
        ToastrModule.forRoot(),
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule,
        MatListModule,
        MatDividerModule,
      ],
      providers: [
        HttpClient
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Fetch Todos
  //  it('should fetch the all todos data', () => {
  //   mockMethods.fetchAllTodos.and.returnValue(of(TODOS));
  //   component.Todo = TODOS;
  //   component.fetchAllTodos();
  //   expect(component.Todo).toBe(TODOS);
  //  });

  // Delete Todo
  // it('should delete the todo', () => {
  //   mockMethods.deleteTodo.and.returnValue(of(true));
  //   component.Todo = TODOS;
  //   component.deleteTodo(TODOS);
  //   expect(component.Todo.id).toBe(TODOS.id);
  // });

  // Delete Task
  // it('should delete the task', () => {
  //   mockMethods.deleteTodo.and.returnValue(of(true));
  //   component.Todo = TODOS;
  //   component.deleteTodo(TODOS);
  //   expect(component.Todo.id).toBe(TODOS.id);
  // });

  // should be check enter new Todo @input placeholder 
  // it('should be check enter new Todo @input placeholder', () => {
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.itemTitle').placeholder).toBe('Todo');
  // });

  // should be check search @input placeholder 
  // it('should be check search @input placeholder', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.search').placeholder).toBe('Search');
  // });


});
