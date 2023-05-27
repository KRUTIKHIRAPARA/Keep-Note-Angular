import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/config';

@Injectable({
  providedIn: 'root'
})
export class JsonsService {

  todoAPI = environment.todoAPI;

  constructor(private _http: HttpClient) { }

  // Get Todos Data
  getTodos() {
    return this._http.get<Array<Todos>>(this.todoAPI);
  }

  // Add Todo Data
  addTodo(body: Todos) {
    return this._http.post(this.todoAPI, body);
  }

  // Add Task Dataa
  addTasks(todoId,body) {
    return this._http.post(`${this.todoAPI}/${todoId}/task`,body);
  }

  // Edit Todo Data
  editTodo(body: Todos) {
    return this._http.put(`${this.todoAPI}/${body.id}`, body);
  }

  // Edit Task Data
  editTask(todoId,body) {
    return this._http.put(`${this.todoAPI}/${todoId}/task/${body.id}`, body);
  }

  // Delele Todo Data
  deleteTodo(body: Todos) {
    return this._http.delete(`${this.todoAPI}/${body.id}`);
  }

  // Delele Task Data
  deleteTask(todoId,body: Todos) {
    return this._http.delete(`${this.todoAPI}/${todoId}/task/${body.id}`);
  }

}

export class Todos {
  id?: number;
  name?: string;
  addedon: Date | any = new Date();
  tasks?: Array<Tasks> = new Array<Tasks>();
  
  // Ui specify
  isInput: boolean = false;
}

export class Tasks {
  id: number;
  todoId: number;
  name?: string;
  isCompleted: boolean;
}