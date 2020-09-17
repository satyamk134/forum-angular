import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  constructor(private auth:AuthService) { }
  loggedIn:boolean= true;
  ngOnInit(): void {
    this.logout()
  }

  logout = () => {
    this.auth.isLoggedIn().subscribe(res=>{
      this.loggedIn = res;
      console.log("is user logged in ",this.loggedIn);
    })
}

}
