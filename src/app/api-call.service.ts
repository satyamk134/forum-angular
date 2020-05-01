import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders,HttpRequest,HttpEventType,HttpResponse
} from '@angular/common/http';
import { environment } from '../environments/environment'
import { HttpClientModule } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { concat,map,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  getSpiceJetData = (data) => {
    return this.http.post<any>(environment.baseUrl+"readSpiceJetData", data);
  }

  uploadAssignmentFile = (data)=>{
    return this.http.post<any>(environment.baseUrl+"uploadAssignmentFile", data);
  }

  updateStockPrice = (data)=>{
    return this.http.put<any>(environment.baseUrl+"updateStockPrice", data);
    
  }

  uploadFile1 = (data)=>{

    const req = new HttpRequest('POST', environment.baseUrl+'testApp/uploadFile', data, {
      reportProgress: true,
    });
    return Observable.create(observer=>{

       this.http.request(req).subscribe(event => {
        // Via this API, you get access to the raw event stream.
        // Look for upload progress events.
        if (event.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${percentDone}% uploaded.`);
          observer.next(percentDone)
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      });
    })
    
    //return this.http.post<any>(environment.baseUrl+"uploadFile", data);
  }

  // uploadFile = (data)=>{

  //   const req = new HttpRequest('POST', environment.baseUrl+'testApp/uploadFile', data, {
  //     reportProgress: true,
  //   });
  //   return this.http.request(req).pipe(
  //     map(event => this.getEventMessage(event, data)),
  //     tap(message => this.showProgress(message)),
  //     last(), // return last (completed) message to caller
  //     catchError(this.handleError(file))
  //   );

  // }
  showProgress = (data)=>{
    console.log("data of progress is",data);
    
  }






}
