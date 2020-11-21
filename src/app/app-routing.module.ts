import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {ManagerComponent} from './manager/manager.component';
import {MenuComponent} from './menu/menu.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent},
  { path: 'manager', component: ManagerComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'menu', component: MenuComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
