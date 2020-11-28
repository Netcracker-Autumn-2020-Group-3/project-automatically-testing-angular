import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor, httpInterceptorProviders} from './auth/auth-interceptor';
import { ManagerComponent } from './manager/manager.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import {UsersListComponent} from './users-list/users-list.component';
import { UsersComponent } from './users/users.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ListActionsComponent} from './main-library-list-actions/list-actions/list-actions.component';
import {MainLibraryListActionsComponent} from './main-library-list-actions/main-library-list-actions.component';
import {SearchActionsComponent} from './main-library-list-actions/search-actions/search-actions.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestCaseCreateComponent } from './test-case-create/test-case-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    ManagerComponent,
    ListActionsComponent,
    MainLibraryListActionsComponent,
    SearchActionsComponent,
    UsersListComponent,
    EditUserComponent,
    UsersComponent,
    ManagerComponent,
    MenuComponent,
    DashboardComponent,
    TestCaseCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [httpInterceptorProviders, ListActionsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
