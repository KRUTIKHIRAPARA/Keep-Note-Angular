import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonsService {

  listAPILink= 'http://localhost:3000/keepNotes';

  constructor(private _http: HttpClient) { }

  // Get List From API
  getListData(){
    return this._http.get<Array<Tasks>>(this.listAPILink);
  }
  
  // Add List From API
  addListData(body:Tasks){
    return this._http.post(this.listAPILink,body);
  }
  
  // Edit List From API
  editListData(body:Tasks){
    return this._http.put(`${this.listAPILink}/${body.id}`,body);
  }
  
  // Delele List From API
  deleteListData(body:Tasks){
    return this._http.delete(`${this.listAPILink}/${body.id}`);
  }

}

export class Tasks{
  id?:number;
  taskName?:string;
  date:Date|any = new Date();
  taskItems?:Array<TaskItem> = new Array<TaskItem>();
}

export class TaskItem{
  item?:string;
  isCompleted:boolean = false;
}