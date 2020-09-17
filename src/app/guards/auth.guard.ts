import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService} from '../services/auth.service';
import { Observable,Observer } from 'rxjs';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): Observable<boolean> {

    this.auth.isLoggedIn().subscribe(res => {
        console.log("res is in auth guard",res);
        if(!res){
            this.router.navigate(['/']);
            return false;
        }
        return true;
    })
     return this.auth.isLoggedIn()
   
    
  }
}
