import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';
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
import {ProjectComponent} from './project/project.component';
import {CreateActionComponent} from './create-action/create-action.component';
import {CreateCompoundComponent} from './create-compound/create-compound.component';
import {RegisterComponent} from './register/register.component';
import {ListOfTestCasesComponent} from './list-of-test-cases/list-of-test-cases.component';
import {TestScenarioCreateComponent} from './test-scenario/test-scenario-create/test-scenario-create.component';
import {TestCaseViewComponent} from './test-case/test-case-view/test-case-view.component';

const routes: Routes = [
  { path: 'create/test-scenario', component: TestScenarioCreateComponent},
  { path: 'library/actions', component: MainLibraryListActionsComponent},
  { path: 'compounds/create', component: CreateCompoundComponent},
  { path: 'dataset/edit/:id', component: EditDataSetComponent},
  { path: 'edit/compound', component: EditCompoundComponent},
  { path: 'edit/compound/actions', component: EditCompoundActionsComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'edituser/:id', component: EditUserComponent },
  { path: 'users', component: UsersComponent},
  { path: 'menu', component: MenuComponent},
  {path: 'projects/:project_id/testcase', component: TestCaseComponent},
  {path: 'projects', component: ProjectComponent},
  {path: 'projects/:project_id/testcase/:test_case_id/edit', component: TestCaseEditComponent},
  {path: 'projects/:project_id/testcase/:test_case_id', component: TestCaseViewComponent},
  { path: 'create-data-set', component: CreateDataSetComponent },
  { path: 'create-action', component: CreateActionComponent },
  { path: 'list-of-data-set', component: ListOfDataSetComponent },
  { path: 'list-of-test-cases', component: ListOfTestCasesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
