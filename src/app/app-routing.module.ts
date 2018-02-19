import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'expenses', component: HomeComponent },
  { path: 'persons', component: HomeComponent },
  { path: 'groups', component: HomeComponent },
  { path: 'expenses/new', component: ExpenseDetailComponent, pathMatch: 'full'},
  { path: 'expenses/:id', component: ExpenseDetailComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
