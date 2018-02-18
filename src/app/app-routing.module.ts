import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { TodosDetailComponent } from './todos-detail/todos-detail.component'
import { StatusesComponent } from './statuses/statuses.component';
import { StatusesDetailComponent } from './statuses-detail/statuses-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', redirectTo: 'todos' },
  { path: 'todos', component: HomeComponent, 
                   children: [ { path: '',component: TodosComponent, pathMatch: 'full' }] },
  { path: 'todos/new', component: TodosDetailComponent, pathMatch: 'full'},
  { path: 'todos/:id', component: TodosDetailComponent },
  { path: 'statuses', component: HomeComponent,
                  children: [ { path: '',component: StatusesComponent, pathMatch: 'full' }] },
  { path: 'statuses/new', component: StatusesDetailComponent, pathMatch: 'full'},
  { path: 'statuses/:id', component: StatusesDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
