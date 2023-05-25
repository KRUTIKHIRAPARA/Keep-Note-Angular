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

  // Add Inner List Button
  addInnerBtn = false;

  // Search Value
  searchVal: string;

  newOneTask:TaskItem;

  addOneItemBtnToogle = false;

  constructor(private _toastr: ToastrService, private _jsons: JsonsService) { }

  ngOnInit(): void {

    // Data Binding Define & Initilazation
    this.getlistArray = new Tasks;
    this.getlistArray.tasks = new Array<TaskItem>();
    

    this.newOneTask = new TaskItem;

    // Methods
    this.getAllList();
    this.addBlankItem();
  }

  jdTodoSend(){
    this._jsons.jdPost(this.getlistArray).subscribe({
      next:(res)=>{
        console.log('Added Data Successfully...');
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  // Add New Row Dynamic
  addBlankItem() {
    this.getlistArray.tasks.push(new TaskItem());
  }

 
  // Remove Row Dynamic
  removeBlankItem(i) {
    if (this.getlistArray.tasks.length != 1) {
      this.getlistArray.tasks.splice(i, 1);
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
    if (this.getlistArray.name) {
      if (this.getlistArray.tasks.filter(x => x.name)) {
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

  // Add New Inner List
  addFinalyListAction(id){

    this.newOneTask.todoId = id;

  
    this.addInnerBtn = false;
    this._jsons.addInnerListData(this.newOneTask).subscribe({
      next: (res) => {
        this.getlistArray = new Tasks;
        this.newOneTask = new TaskItem;
        this.getlistArray.isInput = false;
        this.getAllList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addOneItem(d:Tasks){
    
    if(this.addOneItemBtnToogle)
    {
      d.isInput = true;
      this.addOneItemBtnToogle = false;
    }
    else{
      d.isInput = false;
      this.addOneItemBtnToogle = true;
    }
  }

  // Edit Time Fill Data in Edit Fileds
  fillData(data: Tasks) {
    this.getlistArray = data;
      // this.addBlankItem();
      this.updateAddBtn = true;
      this.fillBtn = false;
  }

  // Edit Datas in API
  editList() {
    this._jsons.editListData(this.getlistArray).subscribe({
      next: (res) => {
        this.editInnerList();
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

  // Edit Inner List Datas
  editInnerList() {
    this.getlistArray.tasks.forEach(element => {
      this._jsons.editInnerListData(element).subscribe({
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
    });
  }

  // Delete Data in API
  deleteList(body) {
    this._jsons.deleteListData(body).subscribe(res=>{
    });
    setTimeout(()=>{
      this.getAllList();
    },300)
  }

  // Desktop Inner List Task Remove
  deleteInnerTask(body){
    this._jsons.deleteInnerListData(body).subscribe({
      next: (res) => {
        this.getAllList();
      },
      error: (err) => {
        console.log(err);
      },
    });
    setTimeout(()=>{
      this.getAllList();
    },300)

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

  // Cancle Add List Data
  cancelAddList(){
    this.getlistArray = new Tasks;
    this.addInnerBtn = false;
    this.getAllList();
    this.addBlankItem();
  }

  // Cancle All Data
  cancelAllData(){
    this.getlistArray = new Tasks;
    this.updateAddBtn = false;
    this.addInnerBtn = false;
    this.fillBtn = true;
    this.getAllList();
    this.addBlankItem();
  }

}



