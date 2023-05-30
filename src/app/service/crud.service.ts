import { Injectable } from '@angular/core';
import { environment } from '../environment/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  todoAPI = environment.todoAPI;

  constructor(private _http: HttpClient) { }

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
  addedon: Date = new Date();
  tasks: Array<Tasks> = new Array<Tasks>();

  // Ui specify
  isInput: boolean = false;
}

export class Tasks {
  id: number;
  todoId: number;
  name: string;
  isCompleted: boolean;
}
