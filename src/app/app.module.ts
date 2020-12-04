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
import { EditUserComponent } from './users/edit-user/edit-user.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import { UsersComponent } from './users/users.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ListActionsComponent} from './main-library-list-actions/list-actions/list-actions.component';
import {MainLibraryListActionsComponent} from './main-library-list-actions/main-library-list-actions.component';
import {SearchActionsComponent} from './main-library-list-actions/search-actions/search-actions.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateDataSetComponent } from './create-data-set/create-data-set.component';
import { ListOfDataSetComponent } from './list-of-data-set/list-of-data-set.component';
import {EditCompoundActionsComponent} from './compound/edit-compound-actions/edit-compound-actions.component';
import {EditCompoundComponent} from './compound/edit-compound/edit-compound.component';
import { MainEditCompoundComponent } from './compound/main-edit-compound.component';
import { EditDataSetComponent } from './edit-data-set/edit-data-set.component';
import { EditNameDataSetComponent } from './edit-data-set/edit-name-data-set/edit-name-data-set.component';
import { EditDataEntryComponent } from './edit-data-set/edit-data-entry/edit-data-entry.component';
import {TestCaseCreateComponent} from './test-case/test-case-create/test-case-create.component';
import { TestCaseComponent } from './test-case/test-case.component';
import { TestCaseEditComponent } from './test-case/test-case-edit/test-case-edit.component';
import { TabsComponent } from './tabs/tabs.component';
import { TestCaseBodyComponent } from './test-case/test-case-body/test-case-body.component';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import {RegisterComponent} from './register/register.component';
import { CreateActionComponent } from './create-action/create-action.component';
import { CreateCompoundComponent } from './create-compound/create-compound.component';
import { CompoundButtonMenuComponent } from './create-compound/compound-button-menu/compound-button-menu.component';
import { CreateCompoundNameComponent } from './create-compound/create-compound-name/create-compound-name.component';
import { CreateCompoundActionsComponent } from './create-compound/create-compound-actions/create-compound-actions.component';
import { ListOfTestCasesComponent } from './list-of-test-cases/list-of-test-cases.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    ListActionsComponent,
    MainLibraryListActionsComponent,
    SearchActionsComponent,
    UsersListComponent,
    EditUserComponent,
    UsersComponent,
    RegisterComponent,
    UsersComponent,
    MenuComponent,
    DashboardComponent,
    CreateDataSetComponent,
    ListOfDataSetComponent,
    CreateDataSetComponent,
    TestCaseCreateComponent,
    CreateDataSetComponent,
    DashboardComponent,
    EditCompoundActionsComponent,
    EditCompoundComponent,
    MainEditCompoundComponent,
    EditDataSetComponent,
    EditNameDataSetComponent,
    EditDataEntryComponent,
    TestCaseComponent,
    TestCaseEditComponent,
    TabsComponent,
    TestCaseBodyComponent,
    ProjectComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    EditDataEntryComponent,
    CreateActionComponent,
    CreateCompoundComponent,
    CompoundButtonMenuComponent,
    CreateCompoundNameComponent,
    CreateCompoundActionsComponent,
    ListOfTestCasesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  providers: [httpInterceptorProviders, ListActionsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
