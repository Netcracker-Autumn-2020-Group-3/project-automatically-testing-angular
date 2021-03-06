import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule, HIGHCHARTS_MODULES } from "angular-highcharts";
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

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
import {ListActionsComponent} from './library/list-actions/list-actions.component';
import {LibraryComponent} from './library/library.component';
import {SearchActionsComponent} from './library/search-actions/search-actions.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardCountComponent } from './dashboard/dashboard-count/dashboard-count.component';
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
import { EditCompoundButtonMenuComponent } from './compound/edit-compound-button-menu/edit-compound-button-menu.component';
import { ListOfTestCasesComponent } from './list-of-test-cases/list-of-test-cases.component';
import { TestScenarioEditComponent } from './test-scenario/test-scenario-edit/test-scenario-edit.component';
import { TestScenarioCreateComponent } from './test-scenario/test-scenario-create/test-scenario-create.component';
import { TestScenarioAddActionComponent } from './test-scenario/test-scenario-add-action/test-scenario-add-action.component';
import { TestScenarioAddCompoundComponent } from './test-scenario/test-scenario-add-compound/test-scenario-add-compound.component';
import { TestScenarioComponent } from './test-scenario/test-scenario.component';
import { ListCompoundsComponent } from './library/list-compounds/list-compounds.component';
import { TestCaseViewComponent } from './test-case/test-case-view/test-case-view.component';
import { TestScenarioListComponent } from './test-scenario/test-scenario-list/test-scenario-list.component';
import { TestCaseListComponent } from './test-case/test-case-list/test-case-list.component';
import { ResetPasswordComponent } from './register/reset-password/reset-password.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SettingsComponent } from './users/settings/settings.component';
import { ResetPasswordSettingsComponent } from './users/settings/reset-password-settings/reset-password-settings.component';
import { DashboardTopSubscribedTestCasesComponent } from './dashboard/dashboard-top-subscribed-test-cases/dashboard-top-subscribed-test-cases.component';
import { PaginationComponent } from './util/pagination/pagination.component';
import { SearchComponent } from './util/search/search.component';
import { ProjectViewComponent } from './project/project-view/project-view.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ListOfTestCaseExecutionComponent } from './list-of-test-case-execution/list-of-test-case-execution.component';
import { ActionExecutionComponent } from './action-execution/action-execution.component';
import { ActionExecutionDashboardComponent } from './dashboard/action-execution-dashboard/action-execution-dashboard.component';

import { DashboardTestCaseExecutionsByDatesComponent } from './dashboard/dashboard-test-case-executions-by-dates/dashboard-test-case-executions-by-dates.component';
import { DashboardTestcaseExecutionNumberComponent } from './dashboard/dashboard-testcase-execution-number/dashboard-testcase-execution-number.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListCompoundActionsComponent } from './compound/list-compound-actions/list-compound-actions.component';
import { OrderByButtonComponent } from './list-of-test-case-execution/order-by-button/order-by-button.component';
import { EditViewActionComponent } from './library/edit-view-action/edit-view-action.component';
import { ErrorComponent } from './error/error.component';
import { ActionExecutionSearchComponent } from './action-execution/action-execution-search/action-execution-search.component';

import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectBodyComponent } from './project/project-body/project-body.component';
import { ResetPassByEmailComponent } from './register/reset-password/reset-pass-by-email/reset-pass-by-email.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    ListActionsComponent,
    LibraryComponent,
    SearchActionsComponent,
    UsersListComponent,
    EditUserComponent,
    UsersComponent,
    RegisterComponent,
    UsersComponent,
    MenuComponent,
    DashboardCountComponent,
    CreateDataSetComponent,
    ListOfDataSetComponent,
    CreateDataSetComponent,
    TestCaseCreateComponent,
    CreateDataSetComponent,
    DashboardCountComponent,
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
    EditCompoundButtonMenuComponent,
    CreateCompoundActionsComponent,
    TestScenarioEditComponent,
    TestScenarioCreateComponent,
    TestScenarioAddActionComponent,
    TestScenarioAddCompoundComponent,
    CreateCompoundActionsComponent,
    ListOfTestCasesComponent,
    TestScenarioComponent,
    ListCompoundsComponent,
    ListOfTestCasesComponent,
    TestCaseViewComponent,
    ListOfTestCasesComponent,
    TestScenarioListComponent,
    TestCaseListComponent,
    ResetPasswordComponent,
    SettingsComponent,
    ResetPasswordSettingsComponent,
    TestCaseListComponent,
    DashboardTopSubscribedTestCasesComponent,
    PaginationComponent,
    SearchComponent,
    TestCaseListComponent,
    ProjectViewComponent,
    ProjectEditComponent,
    NotificationsComponent,
    ProjectEditComponent,
    TestCaseListComponent,
    ListOfTestCaseExecutionComponent,
    TestCaseListComponent,
    ActionExecutionComponent,
    ActionExecutionDashboardComponent,
    ActionExecutionComponent,
    DashboardTestcaseExecutionNumberComponent,
    DashboardTestCaseExecutionsByDatesComponent,
    DashboardComponent,
    ListCompoundActionsComponent,
    DashboardComponent,
    OrderByButtonComponent,
    DashboardComponent,
    EditViewActionComponent,
    ErrorComponent,
    ActionExecutionSearchComponent,
    ProjectBodyComponent,
    ResetPassByEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ChartModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [httpInterceptorProviders, ListActionsComponent,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
