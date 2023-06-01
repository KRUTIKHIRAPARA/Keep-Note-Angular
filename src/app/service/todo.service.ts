import { Injectable } from '@angular/core';
import { environment } from '../environment/config';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoAPI = environment.todoAPI;

  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) { }

  // Loader Show
  loaderShow() {
    // document.body.style.pointerEvents='none';
    this.isLoading.next(true);
  }
  
  // Loader Hide
  loaderHide() {
    // document.body.style.pointerEvents='';
    this.isLoading.next(false);
  }

  // Get Todos Data
  getTodos() {
    return this._http.get<Array<Todos>>(this.todoAPI);
  }

  // Add Todo Data
  addTodo(todo: Todos) {
    return this._http.post(this.todoAPI, todo);
  }

  // Add Task Dataa
  addTasks(todoId, task) {
    return this._http.post(`${this.todoAPI}/${todoId}/task`, task);
  }

  // Edit Todo Data
  editTodo(todo: Todos) {
    return this._http.put(`${this.todoAPI}/${todo.id}`, todo);
  }

  // Edit Task Data
  editTask(todoId, task) {
    return this._http.put(`${this.todoAPI}/${todoId}/task/${task.id}`, task);
  }

  // Delele Todo Data
  deleteTodo(todo: Todos) {
    return this._http.delete(`${this.todoAPI}/${todo.id}`);
  }

  // Delele Task Data
  deleteTask(todoId, task: Todos) {
    return this._http.delete(`${this.todoAPI}/${todoId}/task/${task.id}`);
  }

}

export class Todos {
  id: number;
  name: string;
  addedOn: Date = new Date();
  tasks: Array<Tasks> = new Array<Tasks>();

  // Ui specify
  isInput: boolean = false;
}

export class Tasks {
  id: number;
  todoId: number;
  name: string;
  isCompleted: boolean;

  // Ui specify
  isTaskInput: boolean;
}
