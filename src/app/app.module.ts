import { BrowserModule } from '@angular/platform-browser';
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

import { LoginComponent } from './home/login/login.component';
//import { PostLoginRedirectComponent } from './home/post-login-redirect/post-login-redirect.component';
import { HomeComponent } from './home/home/home.component'
@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    HeaderComponent,
    AppLayoutComponent,
    ChatBoxComponent,
    LoginComponent,
    //PostLoginRedirectComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
