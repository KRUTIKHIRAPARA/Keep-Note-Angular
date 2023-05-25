import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonsService {

  // listAPILink= 'http://localhost:3000/keepNotes';
  // listAPILink= 'http://10.10.5.124:16100/Todo';
  listAPILink = 'http://10.10.5.124:16100/Todo';
  itemlistAPILink = 'http://10.10.5.124:16100/todo/task';
  // listAPILink= 'http://10.10.5.107:16100/Todo';
  // listAPILink= 'http://10.10.5.109:16100/Todo';

  constructor(private _http: HttpClient) { }

  // Get List From API
  getListData() {
    return this._http.get<Array<Tasks>>(this.listAPILink);
  }

  // Add List From API
  addListData(body: Tasks) {
    return this._http.post(this.listAPILink, body);
  }

  // Edit Add List Of Items
  addInnerListData(body) {
    // return this._http.post(`${this.itemlistAPILink}`,body);
    return this._http.post(`http://10.10.5.124:16100/todo/task`, body);
  }

  // Edit List From API
  editListData(body: Tasks) {
    return this._http.put(`${this.listAPILink}/${body.id}`, body);
  }

  // Edit Inner List Of Items
  editInnerListData(body) {
    return this._http.put(`${this.itemlistAPILink}/${body.id}`, body);
  }

  // Delele List From API
  deleteListData(body: Tasks) {
    return this._http.delete(`${this.listAPILink}/${body.id}`);
  }

  // Delele Inner List Of Items
  deleteInnerListData(body: Tasks) {
    return this._http.delete(`${this.itemlistAPILink}/${body.id}`);
  }

  jdPost(body){
    return this._http.post(`http://10.10.5.109:16100/todo`,body);
  }

}

export class Tasks {
  id?: number;
  name?: string;
  addedon: Date | any = new Date();
  tasks?: Array<TaskItem> = new Array<TaskItem>();
  
  // Ui specify
  isInput: boolean = false;
}

export class TaskItem {
  id: number;
  todoId: number;
  name?: string;
  isCompleted: boolean = false;


}