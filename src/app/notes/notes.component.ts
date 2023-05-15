import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  constructor(private toastr: ToastrService){}
  // this.toastr.success('Hello world!', 'Toastr fun!');


  listAdded(){
    console.log('object');
  }

}
