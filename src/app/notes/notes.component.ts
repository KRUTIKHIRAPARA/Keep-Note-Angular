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

  // Data Binding
  todoDetails: Todos;
  singleTaskDetail: Tasks;

  // Store All Todos
  allTodosArray: Array<Todos> = new Array<Todos>();

  searchVal: string;

  // Toggle Variable
  updateAddToggle = false;
  singleTaskEditBtnToggle = false;
  
  constructor(private _toastr: ToastrService, private _crud: CrudService) { }
  // isLoader:boolean = false;

  isLoading: Subject<boolean> = this._crud.isLoading;

  ngOnInit(): void {

    // Todos Data Binding Initilazation
    this.todoDetails = new Todos;
    this.todoDetails.tasks = new Array<Tasks>();

    // Single Task Data Binding Initilazation
    this.singleTaskDetail = new Tasks;

    // Methods
    this.getAllTodos();
    this.addBlankItem();
  }

  // Add Dynamic Task Row 
  addBlankItem() {
    this.todoDetails.tasks.push(new Tasks());
  }

  // Remove Dynamic Task Row 
  removeBlankItem(i) {
    if (this.todoDetails.tasks.length != 1) {
      this.todoDetails.tasks.splice(i, 1);
    }
  }

  // Get All Todos Data
  getAllTodos() {
    this._crud.loaderShow();
    this._crud.getTodos().subscribe({
      next: (res) => {
        this.allTodosArray = res;
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete:()=>{
        this._crud.loaderHide();
      }
    });
  }

  // Add New Todos Data
  addTodo() {
    this._crud.loaderShow();
    if (this.todoDetails.name) {
      if (this.todoDetails.tasks.filter(task => task.name)) {
        this._crud.addTodo(this.todoDetails).subscribe({
          next: (res) => {
            this.todoDetails = new Todos;

            this.getAllTodos();
            this.addBlankItem();

            this._toastr.success('Todo Add Successfully...');
          },
          error: (err) => {
            this._crud.loaderShow();
            this._toastr.error(err);
          },
          complete:()=>{
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
    this.singleTaskDetail.todoId = todoId;

    this._crud.loaderShow();
    this._crud.addTasks(todoId, this.singleTaskDetail).subscribe({
      next: (res) => {
        this.todoDetails = new Todos;
        this.singleTaskDetail = new Tasks;
        this.todoDetails.isInput = false;
        this.getAllTodos();
        this._toastr.success('Task Add Successfully...');
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete:()=>{
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
      this.singleTaskDetail =  new Tasks;
      todo.isInput = true;
    }
    else {
      this.singleTaskDetail =  new Tasks;
      todo.isInput = false;
    }
  }

  /**
   * This method is used to fill todo fields in edit time
   * @param data 
   */

  // Edit Time Fill Data in Edit Fileds
  fillData(data: Todos) {
    this.todoDetails = data;
    this.updateAddToggle = true;
  }

  // Edit Todo Datas 
  editTodo() {
    this._crud.loaderShow();
    this._crud.editTodo(this.todoDetails).subscribe({
      next: (res) => {
        this.editTask();
        this.updateAddToggle = false;
        this.todoDetails = new Todos;
        this.getAllTodos();
        this.addBlankItem();
        this._toastr.success('Todo Edit Successfully...');
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete:()=>{
        this._crud.loaderHide();
      }
    });
  }

  // Edit Task Datas
  editTask() {
    this._crud.loaderShow();
    this.todoDetails.tasks.forEach(task => {
      this._crud.editTask(this.todoDetails.id, task).subscribe({
        next: (res) => {
          this.updateAddToggle = false;
          this.todoDetails = new Todos;
          this.getAllTodos();
          this.addBlankItem();
        },
        error: (err) => {
          this._crud.loaderShow();
          this._toastr.error(err);
        },
        complete:()=>{
          this._crud.loaderHide();
        }
      });
    });
  }

  // Edit Single Task
  fillEditTask(todo,task){
    this.singleTaskDetail = task;
    if (!todo.isInput) {
      todo.isInput = true;
      this.singleTaskEditBtnToggle = true;
    }
    else {
      todo.isInput = false;
      this.singleTaskEditBtnToggle = false;
    }
  }

  // Edit Single Task
  editSingleTask(todoId){
    this._crud.loaderShow();
    this._crud.editTask(todoId, this.singleTaskDetail).subscribe({
      next: (res) => {
        this.updateAddToggle = false;
        this.singleTaskEditBtnToggle = false;
        this.todoDetails = new Todos;
        this.singleTaskDetail = new Tasks;
        this.getAllTodos();
        this.addBlankItem();
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete:()=>{
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
        this.getAllTodos();
        this._toastr.success('Todo Delete Successfully...');
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete:()=>{
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
        this.getAllTodos();
        this._toastr.success('Task Delete Successfully...');
      },
      error: (err) => {
        this._crud.loaderShow();
        this._toastr.error(err);
      },
      complete:()=>{
        this._crud.loaderHide();
      }
    });

  }

  // Search Data in API
  searchTodo() {
    if (this.searchVal) {
      let tempSearchData = new Array<Todos>();
      if (this.allTodosArray.length > 0) {
        for (let todos of this.allTodosArray) {
          if (JSON.stringify(todos).toLowerCase().indexOf(this.searchVal.toLowerCase()) > 0) {
            tempSearchData.push(todos);
          }
        }
        this.allTodosArray = tempSearchData;
      }
    }
    else {
      this.getAllTodos();
    }
  }

  // Cancle Edit Data
  cancelEditTodo() {
    this.updateAddToggle = false;
    this.todoDetails = new Todos;
    this.getAllTodos();
    this.addBlankItem();
  }

  // Cancle Edit All Data
  cancelEditAllData() {
    this.todoDetails = new Todos;
    this.updateAddToggle = false;
    this.getAllTodos();
    this.addBlankItem();
  }

}



