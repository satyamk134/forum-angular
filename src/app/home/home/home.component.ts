import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService) { }

  loggedIn:boolean= true;

  ngOnInit(): void {
    console.log("logged in is in home component",this.loggedIn);
    //subscribe to subject
    this.logout();


  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes are",changes);
    // for (const propName in changes) {
    //   const chng = changes[propName];
    //   const cur  = JSON.stringify(chng.currentValue);
    //   const prev = JSON.stringify(chng.previousValue);
    //   this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    // }
    this.loggedIn = changes['loggedIn'].currentValue;
  }

  

  logout = () => {
      this.auth.isLoggedIn().subscribe(res=>{
        this.loggedIn = false;
        console.log("is user logged in ",this.loggedIn);
      })
  }

}
