import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  loggedIn:boolean;
  constructor(private auth: AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {

    this.changeMenus();
  }

  changeMenus = () => {
    console.log("came inside change menus")
      this.auth.isLoggedIn()
      .subscribe(response => {
        console.log("response is",response);
        this.loggedIn = response;
        if(this.loggedIn){
              this.router.navigate(['dashboard'])
        }else{
          this.router.navigate(['/'])
        }
      })
    
  } 

  logoutUser = ()=>{
    this.auth.logout()

    this.auth.isLoggedIn()
      .subscribe(response=>{
        console.log("response is",response);
        this.loggedIn = response;
        if(this.loggedIn){
              this.router.navigate(['dashboard'])
        }else{
          this.router.navigate(['/'])
        }
      })
  }

}
