import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JsonsService, TaskItem, Tasks } from '../service/jsons.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  
  getlistArray?: Tasks;
  allListArray: Array<Tasks> = new Array<Tasks>();

  updateAddBtn = false;

  constructor(private _toastr: ToastrService, private _jsons: JsonsService) { }
  
  ngOnInit(): void {
    this.getlistArray = new Tasks;
    this.getlistArray.taskItems = new Array<TaskItem>();
    this.getAllList();
    this.addBlankItem();
  }

  addBlankItem() {
    this.getlistArray.taskItems.push(new TaskItem());
  }

  removeBlankItem(i) {
    if(this.getlistArray.taskItems.length != 1){
      this.getlistArray.taskItems.splice(i, 1);
    }
  }

  getAllList() {
    this._jsons.getListData().subscribe({
      next: (res) => {
        this.allListArray = res;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  addNewList() {
    if(this.getlistArray.taskName){
      this._jsons.addListData(this.getlistArray).subscribe({
        next: (res) => {
          this.getAllList();
          this.getlistArray = new Tasks;
          this.addBlankItem();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  fillData(data:Tasks){
    this.getlistArray = data;
    this.updateAddBtn = true;
  }
  
  editList(){
    this._jsons.editListData(this.getlistArray).subscribe({
      next: (res) => {
        this.updateAddBtn = false;
        this.getAllList();
        this.getlistArray = new Tasks;
        this.addBlankItem();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteList(body){
    this._jsons.deleteListData(body).subscribe({
      next: (res) => {
        this.getAllList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}



