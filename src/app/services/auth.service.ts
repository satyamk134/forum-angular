import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders,HttpRequest,HttpEventType,HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { HttpClientModule } from '@angular/common/http'; 
import { Observable,BehaviorSubject } from 'rxjs';
import { concat,map,tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hasToken = ():boolean => {
    console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token') != 'undefined'){
      console.log("came to get item");
      return true
    }
    return false;
    
  }

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  loginWithGoogle = ()=>{
    return this.http.get<any>(environment.baseUrl+"auth/login");
  }

  getAccessToken = (reqObj) => {
    let params = new HttpParams();
    params = params.set('code', reqObj.code)
    return this.http.get<any>(environment.baseUrl+"auth/token",{params});
  }

  getUserInfo = (reqObj) => {
    let params = new HttpParams();
    params = params.set('access_token', reqObj.access_token)
    return this.http.get<any>(environment.baseUrl+"auth/getUserInfo",{params});
  }

  authorizeUser = (reqObj) => {
    let params = new HttpParams();
    params = params.set('access_token', reqObj.access_token)
    return this.http.post<any>(environment.baseUrl+"auth/authorizeUser",{params});
  }

  isLoggedIn = ()=> {
    return this.isLoginSubject.asObservable();
  }

  login = () => {
    this.isLoginSubject.next(true)
  }

  logout = () => {
    console.log("came to logout")
    localStorage.removeItem('token');
    this.isLoginSubject.next(false)
  }



  
}
