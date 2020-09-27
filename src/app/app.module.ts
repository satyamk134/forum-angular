import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashComponent } from './dash/dash.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './shared/material/material.module';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { HTTP_INTERCEPTORS} from '@angular/common/http'
import { httpInterceptor }  from './interceptors/http.interceptor'
import { AuthGuardService } from './guards/auth.guard'
import { LoginComponent } from './home/login/login.component';
import {ProductComponent } from './layouts/app-layout/pages/product/product.component'
//import { PostLoginRedirectComponent } from './home/post-login-redirect/post-login-redirect.component';
import { HomeComponent } from './home/home/home.component';
import {MatIconModule} from '@angular/material/icon';
import { MyCartComponent } from './layouts/app-layout/pages/my-cart/my-cart.component'; 
@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    HeaderComponent,
    AppLayoutComponent,
    ChatBoxComponent,
    LoginComponent,
    ProductComponent,
    //PostLoginRedirectComponent,
    HomeComponent,
    MyCartComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    MatIconModule
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
