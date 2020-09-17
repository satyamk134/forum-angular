import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  code: string;
  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    //read the route parameters
    this.route.queryParamMap.subscribe(queryParams => {
      this.code = queryParams.get("code");
      if (this.code) {
        this.routeToDashBoard()
      }
    })

    //check if user is logged in 
    this.auth.isLoggedIn()
    .subscribe(loggedIn=>{
      if(loggedIn){
        this.router.navigate(['/product'])
      }
    })
  }

  continueWithGoogle = () => {
    this.auth.loginWithGoogle()
      .subscribe(res => {
        window.open(res.url, "_self", "toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=500,height=400")
      })
  }

  routeToDashBoard = () => {
    /**
     * take code from the url and exhange it to get access_token_and id_token 
     * pass this id_token which contains the info of the user to create or login user
    */
    this.auth.getAccessToken({ code: this.code })
      .pipe(concatMap(response => {
        localStorage.setItem('token', response.id_token)
        return this.auth.authorizeUser({ access_token: response.access_token })
      }))
      .subscribe(response => {
        /**
         * set the localstorage
        */
        localStorage.setItem('token', response.data.token);
        this.auth.login()
        this.router.navigate(['/product'])
      })

  }



}
