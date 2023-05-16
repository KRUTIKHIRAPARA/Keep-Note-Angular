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
    this._jsons.getJsonData().subscribe({
      next: (res) => {
        this.allListArray = res;
        console.log(res);
      }
    });
  }

  addNewList() {
    this._jsons.addJsonData(this.getlistArray).subscribe({
      next: () => {
        console.log('Successfully Data Added');
      },
      error: () => {
        console.log('Error');
      }
    });
  }

}



