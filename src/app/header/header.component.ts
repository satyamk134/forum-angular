import { Component, OnInit ,Input} from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  @Input() loggedIn:boolean;
  noOfItems:number = 0;
  constructor(private auth: AuthService,
    private router:Router,
    private ProductService:ProductService
    ) { }

  ngOnInit(): void {

    console.log("logged in is",this.loggedIn);
    this.getCartDetails();
    
  }

  getCartDetails = ()=>{
      this.ProductService.userCart.subscribe((res:any)=>{
          console.log("cart Response is",res);
          if(res){
            this.noOfItems = res.noOfItems;
          }else if(res.length == 0){
            this.noOfItems = 0;
          }
          
      })

  }

  logoutUser = ()=>{
    this.auth.logout();
  }

  goToMyCart = ()=>{
    this.router.navigate(['/cart']);
  }

}
