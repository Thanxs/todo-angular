import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

import {AdminLayoutComponent} from './shared/components/admin-layouts/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardTodoComponent } from './dashboard-todo/dashboard-todo.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

import {AuthService} from '../shared/services/auth.service';
import {AuthGuard} from '../shared/services/auth.guard';
import {SearchPipe} from './shared/search.pipe';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardTodoComponent,
    AddTodoComponent,
    EditTodoComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardTodoComponent, canActivate: [AuthGuard]},
          {path: 'add', component: AddTodoComponent, canActivate: [AuthGuard]},
          {path: 'todo/:id/edit', component: EditTodoComponent, canActivate: [AuthGuard]}
        ] }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AdminModule {

}
