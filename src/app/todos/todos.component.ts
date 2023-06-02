import { Component } from '@angular/core';
import { Tasks, TodoService, Todos } from '../service/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {

  // Data Bind
  Todo: Todos;
  editTodos: Todos;
  Task: Tasks;
  editTasks: Tasks;

  // Store All Todos
  allTodos: Array<Todos> = new Array<Todos>();

  searchVal: string;

  // Toggle Variable
  isSingleTaskEdit = false;
  isTaskEdit = true;

  constructor(private _toastr: ToastrService, private _crud: TodoService) { }

  // isLoader:boolean = false;
  isLoading: Subject<boolean> = this._crud.isLoading;

  ngOnInit(): void {

    // Todos Data Binding Initilazation
    this.Todo = new Todos;
    this.editTodos = new Todos;
    this.Todo.tasks = new Array<Tasks>();

    // Single Task Data Binding Initilazation
    this.Task = new Tasks;
    this.editTasks = new Tasks;

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
    if (this.Todo.name) {
      if (this.Todo.tasks.filter(task => task.name)) {
        this._crud.addTodo(this.Todo).subscribe({
          next: (res) => {
            this.Todo = new Todos;

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
    this.Task.todoId = todoId;

    this._crud.loaderShow();
    this._crud.addTasks(todoId, this.Task).subscribe({
      next: (res) => {
        this.Todo = new Todos;
        this.Task = new Tasks;
        this.Todo.isInput = false;
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
  toggleAddTask(todo: Todos) {
    this.allTodos.forEach((todo) => {
      todo.isInput = false;
      todo.isEditInput = false;
    })
    if (todo.isInput) {
      this.Task = new Tasks;
      todo.isInput = false;
    }
    else {
      this.Task = new Tasks;
      todo.isInput = true;
    }
  }

  /**
   * This method is used to fill todo fields in edit time
   * @param data 
   */

  // Edit Todo Datas
  editTodo(todo: Todos) {
    this.allTodos.forEach((todo) => {
      todo.isInput = false;
      todo.isEditInput = false;
      todo.tasks.forEach((task) => {
        task.isTaskInput = false;
      })
    })

    this.editTodos = todo;
    todo.isEditInput = true;
  }

  // Update Todo Datas 
  updateTodo(todo) {
    // console.log(this.editTodos);
    this._crud.loaderShow();
    this._crud.editTodo(this.editTodos).subscribe({
      next: (res) => {
        todo.isEditInput = false;
        this.editTodos = new Todos;
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
  editTask(task) {
    this.allTodos.forEach((todo) => {
      todo.isInput = false;
      todo.isEditInput = false;
      todo.tasks.forEach((task) => {
        task.isTaskInput = false;
      })
    })

    this.editTasks = task;
    if (task.isTaskInput) {
      task.isTaskInput = false;
      this.isTaskEdit = true;
    }
    else {
      task.isTaskInput = true;
      this.isTaskEdit = false;
    }
  }

  returnEditTask(task) {
    task.isTaskInput = false;
    this.isTaskEdit = true;
  }

  // Update Task
  updateTask(todoId) {
    this.editTasks.todoId = todoId;
    console.log(this.editTasks);

    this._crud.loaderShow();
    this._crud.editTask(todoId, this.editTasks).subscribe({
      next: (res) => {
        this.isSingleTaskEdit = false;
        this.Todo = new Todos;
        this.Task = new Tasks;
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

  isTaskCompleted(todoId, task) {
    this._crud.loaderShow();
    this._crud.editTask(todoId, task).subscribe({
      next: (res) => {
        this.Todo = new Todos;
        this.Task = new Tasks;
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
    this.Todo = new Todos;
    this.editTasks = new Tasks;
    this.editTodos = new Todos;
    this.fetchAllTodos();
  }

  cancelTodo() {
    this.Todo = new Todos;
  }
}