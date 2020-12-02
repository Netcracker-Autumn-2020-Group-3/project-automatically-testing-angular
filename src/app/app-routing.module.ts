import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {ManagerComponent} from './manager/manager.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import {UsersComponent} from './users/users.component';
import {MenuComponent} from './menu/menu.component';

import {MainLibraryListActionsComponent} from './main-library-list-actions/main-library-list-actions.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateDataSetComponent} from './create-data-set/create-data-set.component';
import {ListOfDataSetComponent} from './list-of-data-set/list-of-data-set.component';

import {EditCompoundComponent} from './compound/edit-compound/edit-compound.component';
import {MainEditCompoundComponent} from './compound/main-edit-compound.component';
import {EditCompoundActionsComponent} from './compound/edit-compound-actions/edit-compound-actions.component';
import {EditDataSetComponent} from './edit-data-set/edit-data-set.component';
import {TestCaseCreateComponent} from './test-case/test-case-create/test-case-create.component';
import {TestCaseComponent} from './test-case/test-case.component';
import {TestCaseEditComponent} from './test-case/test-case-edit/test-case-edit.component';

const routes: Routes = [
  {path: 'library/actions', component: MainLibraryListActionsComponent},
  {path: 'dataset/edit', component: EditDataSetComponent},
  {path: 'edit/compound', component: EditCompoundComponent},
  {path: 'edit/compound/actions', component: EditCompoundActionsComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'manager', component: ManagerComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'edituser/:id', component: EditUserComponent},
  {path: 'users', component: UsersComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'createDataSet', component: CreateDataSetComponent},
  {path: 'listOfDataSet', component: ListOfDataSetComponent},
  {path: 'projects/:project_id/testcase', component: TestCaseComponent},
  // { path: 'projects/:project_id/testcase/create', component: TestCaseCreateComponent}
  {path: 'projects/:project_id/testcase/:test_case_id/edit', component: TestCaseEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
