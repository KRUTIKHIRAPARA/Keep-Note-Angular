import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JsonsService, List, ListOfItems } from '../service/jsons.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  constructor(private _toastr: ToastrService, private _jsons: JsonsService){}
  // this.toastr.success('Hello world!', 'Toastr fun!');

  dynamicArray: Array<ListOfItems> = [];  
  newDynamic: any = {};  

  taskName?:string ;
  getlistArray:Array<List> = [];
  allListArray: Array<List> = new Array();

  ngOnInit(): void {  
      this.newDynamic = {completed: false, item: ""};  
      this.dynamicArray.push(this.newDynamic);  
    console.log(this.allListArray);
      this.getAllList();
  }  

  addRow() {    
    this.newDynamic = {completed: false, item: ""};  
    this.dynamicArray.push(this.newDynamic); 
    console.log('New row added successfully');
    console.log(this.dynamicArray);  
    return true;  
  } 

  deleteRow(index:any) {  
    if(this.dynamicArray.length ==1) {  
      console.log('Cant delete the row when there is only one row');  
        return false;  
    } else {  
        this.dynamicArray.splice(index, 1); 
        console.log('Row deleted successfully');
        return true;  
    }  
}  

addNewList(){
  let body ={
    task : this.taskName, 
    listOfItems : this.dynamicArray
  }
  this._jsons.addJsonData(body).subscribe({
    next:()=>{
      console.log('Successfully Data Added');
    },
    error:()=>{
      console.log('Error');
    }
  });
}

getAllList(){
  this._jsons.getJsonData().subscribe({
    next:(res)=>{
      this.allListArray.push(res);
      console.log(res);
    }
  });
}

}



