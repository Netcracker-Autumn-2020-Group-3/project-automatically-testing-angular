import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import {AuthInterceptor, httpInterceptorProviders} from './auth/auth-interceptor';
import { ManagerComponent } from './manager/manager.component';
import {UsersComponent} from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    ManagerComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
