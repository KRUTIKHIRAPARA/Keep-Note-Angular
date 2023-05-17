import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JsonsService, TaskItem, Tasks } from '../service/jsons.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  // Data Binding Get Data
  getlistArray?: Tasks;

  // Store Get All Datas
  allListArray: Array<Tasks> = new Array<Tasks>();

  // Edit and Update Button Toogle
  updateAddBtn = false;

  // Fill Data But Second Time Button Click Then Not Fill Data
  fillBtn = true;

  // Search Value
  searchVal: string;

  constructor(private _toastr: ToastrService, private _jsons: JsonsService) { }

  ngOnInit(): void {

    // Data Binding Define & Initilazation
    this.getlistArray = new Tasks;
    this.getlistArray.taskItems = new Array<TaskItem>();

    // Methods
    this.getAllList();
    this.addBlankItem();
  }

  // Add New Row Dynamic
  addBlankItem() {
    this.getlistArray.taskItems.push(new TaskItem());
  }

  // Remove Row Dynamic
  removeBlankItem(i) {
    if (this.getlistArray.taskItems.length != 1) {
      this.getlistArray.taskItems.splice(i, 1);
    }
  }

  // Get All Datas In API
  getAllList() {
    this._jsons.getListData().subscribe({
      next: (res) => {
        this.allListArray = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Add Datas In API
  addNewList() {
    if (this.getlistArray.taskName) {
      if (this.getlistArray.taskItems.filter(x => x.item)) {
        this._jsons.addListData(this.getlistArray).subscribe({
          next: (res) => {
            this.getlistArray = new Tasks;
            this.getAllList();
            this.addBlankItem();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }
  }

  // Edit Time Fill Data in Edit Fileds
  fillData(data: Tasks) {
    if(this.fillBtn){
      this.getlistArray = data;
      this.updateAddBtn = true;
      this.fillBtn = false;
    }
    else{
      this.getlistArray = new Tasks;
      this.fillBtn = true;
      this.updateAddBtn = false;
      this.addBlankItem();
    }
  }

  // Edit Datas in API
  editList() {
    this._jsons.editListData(this.getlistArray).subscribe({
      next: (res) => {
        this.updateAddBtn = false;
        this.getlistArray = new Tasks;
        this.getAllList();
        this.addBlankItem();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Delete Data in API
  deleteList(body) {
    this._jsons.deleteListData(body).subscribe({
      next: (res) => {
        this.getAllList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Search Data in API
  searchList() {
    if (this.searchVal) {
      let searchEmployee = new Array<Tasks>();
      if (this.allListArray.length > 0) {
        for (let emp of this.allListArray) {
          if (JSON.stringify(emp).toLowerCase().indexOf(this.searchVal.toLowerCase()) > 0) {
            searchEmployee.push(emp);
          }
        }
        this.allListArray = searchEmployee;
      }
    }
    else {
      this.getAllList();
    }
  }

  // Cancle Edit Data
  cancelEditList(){
    this.updateAddBtn = false;
    this.fillBtn = true;
    this.getlistArray = new Tasks;
    this.getAllList();
    this.addBlankItem();
  }

  // Cancle All Data
  cancelAllData(){
    this.updateAddBtn = false;
    this.fillBtn = true;
    this.getlistArray = new Tasks;
    this.getAllList();
    this.addBlankItem();
  }

}



