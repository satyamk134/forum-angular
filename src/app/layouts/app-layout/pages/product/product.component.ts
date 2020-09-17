import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products:any = [];
  constructor(private ProductService:ProductService) { }

  ngOnInit(): void {
    this.products = [];
    this.shopByCategory()
  }

  shopByCategory = ()=>{
      //do the api call for specific category
      this.ProductService.getProducts()
      .subscribe((respose:any)=>{
        console.log("response is ",respose);
        this.products = respose.data;
      })
  }

  //----- add to cart starts here
  addToCartHandler = (data)=> {
      this.ProductService.addToCartHandler({productId: data._id})
      .subscribe(response=>{
        console.log("Response is",response);
      })
  }

  


  

}
