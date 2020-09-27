import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders,HttpRequest,HttpEventType,HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { HttpClientModule } from '@angular/common/http'; 
import { Observable,BehaviorSubject } from 'rxjs';
import { concat,map,tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  userCart = new BehaviorSubject<{noOfItems:number}>({noOfItems:0});
  getProducts = () => {
      return  this.http.get('http://localhost:4545/api/product/');
  }

  addToCartHandler = (data) => {
    return  this.http.post('http://localhost:4545/api/product/cart',data);
  }

  getCartDetails = ()=>{
    
    return  this.http.get('http://localhost:4545/api/product/cart/user');
  }

  updateCartData = (data)=>{
    return this.userCart.next(data);
  }

  getCartData = (data)=>{
    return this.userCart.next(data);
  }

  getCartData1 = ()=>{
    return this.userCart.asObservable();
  }


}
