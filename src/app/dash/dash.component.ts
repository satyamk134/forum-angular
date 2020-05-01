import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { debounceTime, distinctUntilChanged, map, startWith, tap, switchMap,mergeMap, concatMap, timeout,delay } from 'rxjs/operators';
import { Subject, Subscription, Observable,fromEvent, of,from } from 'rxjs';
import { ApiCallService} from '../api-call.service'
import  io  from 'socket.io-client'
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  file_uploaded_percent:number =0;

  constructor(private apiCall:ApiCallService) { }

  
  ngOnInit() {
    // console.log("io is",io)
    // const socket = io('http://localhost:4545');
    // // socket.emit('chat', 'hello Satyam Kumar', (data) => {
    // //   console.log("chat emitted");
    // //   console.log(data); 
    // // });
    // socket.emit('chat', 'hello vivek Kumar Anand','how you doing',(data)=>{
    //   console.log("data is",data)
    // });
   
  }

  // submitFileHandler = (event)=>{
  //   console.log("file upload handler");
  //   console.log("event file is",event.target.files[0]);
  //   var formData = new FormData();
  //   formData.append("myfile",event.target.files[0]);

  //   this.apiCall.uploadFile(formData)
  //   .subscribe(response => {
  //     console.log("Response is",response);
  //     this.file_uploaded_percent = <number>response;
  //   })
  // }




   
    
}

  







