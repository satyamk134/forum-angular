import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders,HttpRequest,HttpEventType,HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { HttpClientModule } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  getProducts = () => {
      return  this.http.get('http://localhost:4545/api/product/');
  }

  addToCartHandler = (data) => {
    return  this.http.post('http://localhost:4545/api/product/cart',data);
  }


}
