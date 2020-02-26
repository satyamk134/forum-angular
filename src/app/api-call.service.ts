import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { HttpClientModule } from '@angular/common/http'; 

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


}
