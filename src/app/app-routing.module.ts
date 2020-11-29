import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {ManagerComponent} from './manager/manager.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersComponent} from './users/users.component';
import {MenuComponent} from './menu/menu.component';

import {MainLibraryListActionsComponent} from './main-library-list-actions/main-library-list-actions.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateDataSetComponent} from "./create-data-set/create-data-set.component";
import {TestCaseCreateComponent} from './test-case-create/test-case-create.component';

const routes: Routes = [
  { path: 'library/actions', component: MainLibraryListActionsComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'manager', component: ManagerComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'edituser/:id', component: EditUserComponent },
  { path: 'users', component: UsersComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'testcase/create', component: TestCaseCreateComponent}
  { path: 'menu', component: MenuComponent},
  { path: 'createDataSet', component: CreateDataSetComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
