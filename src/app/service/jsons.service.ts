import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonsService {

  jsonUrl= 'http://localhost:3000/keepNotes';

  constructor(private _http: HttpClient) { }

  getJsonData(){
    return this._http.get<Array<Tasks>>(this.jsonUrl);
  }

  addJsonData(body:any){
    return this._http.post(this.jsonUrl,body);
  }

}

export class Tasks{
  id?:number;
  taskName?:string;
  taskItems?:Array<TaskItem> = new Array<TaskItem>();
}

export class TaskItem{
  item?:string;
  isCompleted:boolean = false;
}