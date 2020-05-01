import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { AppLayoutComponent} from './layouts/app-layout/app-layout.component'
import { LoginComponent }from './home/login/login.component'
//import { PostLoginRedirectComponent } from './home/post-login-redirect/post-login-redirect.component'
import { HomeComponent } from './home/home/home.component'
const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children:[{
      path:'',
      component:LoginComponent
    }]
  },
  { path: 'dashboard', 
    component: AppLayoutComponent,
    children:[{
      path:'',
      component:DashComponent
    }]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
