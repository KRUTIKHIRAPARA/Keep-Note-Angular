import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService, Tasks, Todos } from '../service/crud.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  // Data Bind
  todo: Todos;
  task: Tasks;

  // Store All Todos
  allTodos: Array<Todos> = new Array<Todos>();

  searchVal: string;

  // Toggle Variable
  isTodoEdit = false;
  isSingleTaskEdit = false;

  value = 'Clear me';

  constructor(private _toastr: ToastrService, private _crud: CrudService) { }
  // isLoader:boolean = false;

  isLoading: Subject<boolean> = this._crud.isLoading;

  ngOnInit(): void {

    // Todos Data Binding Initilazation
    this.todo = new Todos;
    this.todo.tasks = new Array<Tasks>();

    // Single Task Data Binding Initilazation
    this.task = new Tasks;

    // Methods
    this.fetchAllTodos();
  }

  // Get All Todos Data
  fetchAllTodos() {
    this._crud.loaderShow();
    this._crud.getTodos().subscribe({
      next: (res) => {
        this.allTodos = res;
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete: () => {
        this._crud.loaderHide();
      }
    });
  }

  // Add New Todos Data
  addTodo() {
    this._crud.loaderShow();
    if (this.todo.name) {
      if (this.todo.tasks.filter(task => task.name)) {
        this._crud.addTodo(this.todo).subscribe({
          next: (res) => {
            this.todo = new Todos;

            this.fetchAllTodos();

            this._toastr.success('Todo Add Successfully...');
          },
          error: (err) => {
            this._crud.loaderShow();
            this._toastr.error(err);
          },
          complete: () => {
            this._crud.loaderHide();
          }
        });
      }
    }
  }

  /**
   * This Mehtod is used to add single task
   * @param todoId 
   */

  // Add Single Task Data
  addSingleTask(todoId) {
    this.task.todoId = todoId;

    this._crud.loaderShow();
    this._crud.addTasks(todoId, this.task).subscribe({
      next: (res) => {
        this.todo = new Todos;
        this.task = new Tasks;
        this.todo.isInput = false;
        this.fetchAllTodos();
        this._toastr.success('Task Add Successfully...');
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete: () => {
        this._crud.loaderHide();
      }
    });
  }

  /** 
   * This metnod is used to task add time task part toggle
   * @param todo
   */

  // Single Task Add Time Task Part Toggle
  addSingleTaskToggleMethod(todo: Todos) {
    if (!todo.isInput) {
      this.task = new Tasks;
      todo.isInput = true;
    }
    else {
      this.task = new Tasks;
      todo.isInput = false;
    }
  }

  /**
   * This method is used to fill todo fields in edit time
   * @param data 
   */

  // Edit Todo Datas
  editTodo(data: Todos) {
    this.todo = data;
    this.isTodoEdit = true;
  }

  // Update Todo Datas 
  updateTodo() {
    this._crud.loaderShow();
    this._crud.editTodo(this.todo).subscribe({
      next: (res) => {
        this.isTodoEdit = false;
        this.todo = new Todos;
        this.fetchAllTodos();
        this._toastr.success('Todo Edit Successfully...');
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete: () => {
        this._crud.loaderHide();
      }
    });
  }

  // Edit Task
  editTask(todo, task) {
    this.task = task;
    if (!todo.isInput) {
      todo.isInput = true;
      this.isSingleTaskEdit = true;
    }
    else {
      todo.isInput = false;
      this.isSingleTaskEdit = false;
    }
  }

  // Update Task
  updateTask(todoId) {
    this._crud.loaderShow();
    this._crud.editTask(todoId, this.task).subscribe({
      next: (res) => {
        this.isTodoEdit = false;
        this.isSingleTaskEdit = false;
        this.todo = new Todos;
        this.task = new Tasks;
        this.fetchAllTodos();
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete: () => {
        this._crud.loaderHide();
      }
    });
  }

  /**
   * This method is used to delete todo
   * @param todo 
   */

  // Delete Todo Datas
  deleteTodo(todo) {
    this._crud.loaderShow();
    this._crud.deleteTodo(todo).subscribe({
      next: (res) => {
        this.fetchAllTodos();
        this._toastr.success('Todo Delete Successfully...');
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete: () => {
        this._crud.loaderHide();
      }
    });
  }

  /**
   * This method is used to delete task 
   * @param todoId 
   * @param task 
   */

  // Delete Task Datas
  deleteTask(todoId, task) {
    this._crud.loaderShow();
    this._crud.deleteTask(todoId, task).subscribe({
      next: (res) => {
        this.fetchAllTodos();
        this._toastr.success('Task Delete Successfully...');
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete: () => {
        this._crud.loaderHide();
      }
    });

  }

  // Search Data in API
  searchTodo() {
    if (this.searchVal) {
      let tempSearchData = new Array<Todos>();
      if (this.allTodos.length > 0) {
        for (let todos of this.allTodos) {
          if (JSON.stringify(todos).toLowerCase().indexOf(this.searchVal.toLowerCase()) > 0) {
            tempSearchData.push(todos);
          }
        }
        this.allTodos = tempSearchData;
      }
    }
    else {
      this.fetchAllTodos();
    }
  }

  // Cancle Update Data
  cancelUpdates() {
    this.isTodoEdit = false;
    this.todo = new Todos;
    this.fetchAllTodos();
  }

}



