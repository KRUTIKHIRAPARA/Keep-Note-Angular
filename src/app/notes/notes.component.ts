import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JsonsService, Tasks, Todos } from '../service/jsons.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  // Data Binding
  todoDetails: Todos;
  singleTaskDetail:Tasks;

  // Store All Todos
  allTodosArray: Array<Todos> = new Array<Todos>();

  searchVal: string;

  // Toggle Variable
  updateAddToggle = false;
  singleTaskAddToggle = true;

  constructor(private _toastr: ToastrService, private _jsons: JsonsService) { }

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

  // Add New Row Dynamic
  addBlankItem() {
    this.todoDetails.tasks.push(new Tasks());
  }

  // Remove Row Dynamic
  removeBlankItem(i) {
    if (this.todoDetails.tasks.length != 1) {
      this.todoDetails.tasks.splice(i, 1);
    }
  }

  // Get All Todos Data
  getAllTodos() {
    this._jsons.getTodos().subscribe({
      next: (res) => {
        this.allTodosArray = res;
      },
      error: (err) => {
        this._toastr.error(err);
      }
    });
  }

  // Add New Todos Data
  addTodo() {
    if (this.todoDetails.name) {
      if (this.todoDetails.tasks.filter(x => x.name)) {
        this._jsons.addTodo(this.todoDetails).subscribe({
          next: (res) => {
            this.todoDetails = new Todos;

            this.getAllTodos();
            this.addBlankItem();

            this._toastr.success('Todo Add Successfully...');
          },
          error: (err) => {
            this._toastr.error(err);
          }
        });
      }
    }
  }

  // Add Single Task Data
  addSingleTask(id){
    this.singleTaskDetail.todoId = id;

    this._jsons.addTasks(id,this.singleTaskDetail).subscribe({
      next: (res) => {
        this.todoDetails = new Todos;
        this.singleTaskDetail = new Tasks;
        this.todoDetails.isInput = false;
        this.getAllTodos();
        this._toastr.success('Task Add Successfully...');
      },
      error: (err) => {
        this._toastr.error(err);
      }
    });
  }

  // Single Task Add Time Task Part Toggle
  addSingleTaskToggleMethod(d:Todos){
    if(this.singleTaskAddToggle)
    {
      d.isInput = true;
      this.singleTaskAddToggle = false;
    }
    else{
      d.isInput = false;
      this.singleTaskAddToggle = true;
    }
  }

  // Edit Time Fill Data in Edit Fileds
  fillData(data: Todos) {
    this.todoDetails = data;
    this.updateAddToggle = true;
  }

  // Edit Datas in API
  editTodo() {
    this._jsons.editTodo(this.todoDetails).subscribe({
      next: (res) => {
        this.editTask();
        this.updateAddToggle = false;
        this.todoDetails = new Todos;
        this.getAllTodos();
        this.addBlankItem();
        this._toastr.success('Todo Edit Successfully...');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Edit Inner List Datas
  editTask() {
    this.todoDetails.tasks.forEach(element => {
      this._jsons.editTask(this.todoDetails.id,element).subscribe({
        next: (res) => {
          this.updateAddToggle = false;
          this.todoDetails = new Todos;
          this.getAllTodos();
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
    this._jsons.deleteTodo(body).subscribe(res=>{
      this.getAllTodos();
      this._toastr.success('Todo Delete Successfully...');
    });
  }

  // Desktop Inner List Task Remove
  deleteInnerTask(TodoId,body){
    this._jsons.deleteTask(TodoId,body).subscribe({
      next: (res) => {
        this.getAllTodos();
        this._toastr.success('List Delete Successfully...');
      },
      error: (err) => {
        console.log(err);
      },
    });  

  } 

  // Search Data in API
  searchList() {
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
  cancelEditList(){
    this.updateAddToggle = false;
    this.todoDetails = new Todos;
    this.getAllTodos();
    this.addBlankItem();
  }

  // Cancle Add List Data
  cancelAddList(){
    this.todoDetails = new Todos;
    this.getAllTodos();
    this.addBlankItem();
  }

  // Cancle All Data
  cancelAllData(){
    this.todoDetails = new Todos;
    this.updateAddToggle = false;
    this.getAllTodos();
    this.addBlankItem();
  }

}



