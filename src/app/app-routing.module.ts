import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import {UsersComponent} from './users/users.component';
import {MenuComponent} from './menu/menu.component';

import {LibraryComponent} from './library/library.component';
import {DashboardCountComponent} from './dashboard/dashboard-count/dashboard-count.component';
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
import {TestScenarioComponent} from './test-scenario/test-scenario.component';
import {TestCaseViewComponent} from './test-case/test-case-view/test-case-view.component';
import {TestScenarioListComponent} from './test-scenario/test-scenario-list/test-scenario-list.component';
import {TestCaseListComponent} from './test-case/test-case-list/test-case-list.component';
import { ResetPasswordComponent } from './register/reset-password/reset-password.component';
import {SettingsComponent} from './users/settings/settings.component';
import {ProjectViewComponent} from './project/project-view/project-view.component';
import {ProjectEditComponent} from './project/project-edit/project-edit.component';
import {ListOfTestCaseExecutionComponent} from './list-of-test-case-execution/list-of-test-case-execution.component';
import {ActionExecutionComponent} from './action-execution/action-execution.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ListCompoundActionsComponent} from './compound/list-compound-actions/list-compound-actions.component';
import {TestScenarioEditComponent} from './test-scenario/test-scenario-edit/test-scenario-edit.component';
import {EditViewActionComponent} from './library/edit-view-action/edit-view-action.component';
import {RoleGuard} from './guards/role.guard';
import {ErrorComponent} from './error/error.component';
import {ActionExecutionDashboardComponent} from "./dashboard/action-execution-dashboard/action-execution-dashboard.component";
import {NotificationsComponent} from './notifications/notifications.component';

const routes: Routes = [
  { path: 'list/actions-execution/:test_case_execution_id', component: ActionExecutionComponent},
  { path: 'test-scenario', component: TestScenarioComponent, canActivateChild: [RoleGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'list'},
      { path: 'create', component: TestScenarioCreateComponent},
      { path: 'edit/:id', component: TestScenarioEditComponent},
      { path: 'list', component : TestScenarioListComponent},
    ]
  },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [RoleGuard]},
  { path: 'library', component: LibraryComponent, canActivate: [RoleGuard]},
  { path: 'library/compound/:id', component: ListCompoundActionsComponent, canActivate: [RoleGuard]},
  { path: 'compounds/create', component: CreateCompoundComponent, canActivate: [RoleGuard]},
  { path: 'compounds/edit/:id', component: MainEditCompoundComponent, canActivate: [RoleGuard]},
  { path: 'action/view-edit/:id', component: EditViewActionComponent, canActivate: [RoleGuard]},
  { path: 'dataset/edit/:id', component: EditDataSetComponent, canActivate: [RoleGuard]},
  { path: 'dashboard-count', component: DashboardCountComponent, canActivate: [RoleGuard]},
  { path: 'auth/login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'edituser/:id', component: EditUserComponent },
  { path: 'users', component: UsersComponent},
  { path: 'menu', component: MenuComponent, canActivate: [RoleGuard]},
  { path: 'projects/:project_id/testcase', component: TestCaseListComponent, canActivate: [RoleGuard]},
  { path: 'projects/:project_id/edit', component: ProjectEditComponent, canActivate: [RoleGuard]},
  { path: 'projects/:project_id', component: ProjectViewComponent, canActivate: [RoleGuard]},
  { path: 'projects', component: ProjectComponent, canActivate: [RoleGuard]},
  { path: 'projects/:project_id/testcase/:test_case_id/edit', component: TestCaseEditComponent, canActivate: [RoleGuard]},
  { path: 'projects/:project_id/testcase/:test_case_id', component: TestCaseViewComponent, canActivate: [RoleGuard]},
  { path: 'create-data-set', component: CreateDataSetComponent, canActivate: [RoleGuard] },
  { path: 'create-action', component: CreateActionComponent, canActivate: [RoleGuard] },
  { path: 'list-of-data-set', component: ListOfDataSetComponent, canActivate: [RoleGuard] },
  { path: 'list-of-test-cases', component: ListOfTestCasesComponent, canActivate: [RoleGuard] },
  { path: 'list-of-test-cases-pagination', component: TestCaseListComponent, canActivate: [RoleGuard]},
  { path: 'list-of-test-case-execution', component: ListOfTestCaseExecutionComponent, canActivate: [RoleGuard] },
  { path: 'list-of-test-cases-pagination', component: TestCaseListComponent, canActivate: [RoleGuard]},
  { path: 'reset-password/:token', component: ResetPasswordComponent, canActivate: [RoleGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [RoleGuard]},
  { path:'action-execution-dashboard', component: ActionExecutionDashboardComponent, canActivate: [RoleGuard] },
  { path: 'notification', component: NotificationsComponent, canActivate: [RoleGuard]},
  { path: 'action-execution-dashboard', component: ActionExecutionDashboardComponent, canActivate: [RoleGuard] },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
