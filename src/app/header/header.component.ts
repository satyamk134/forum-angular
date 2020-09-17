import { Component, OnInit ,Input} from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  @Input() loggedIn:boolean;
  constructor(private auth: AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {

    console.log("logged in is",this.loggedIn);
  }
  

   

  logoutUser = ()=>{
    this.auth.logout();
  }

}
