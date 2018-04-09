import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { ExpenseDetailComponent } from './components/expense-detail/expense-detail.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { PersonsComponent } from './components/persons/persons.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', redirectTo: '/expenses', pathMatch: 'full' },
  {
    path: 'persons', component: HomeComponent,
    children: [{ path: '', component: PersonsComponent, pathMatch: 'full' }]
  },
  {
    path: 'expenses', component: HomeComponent,
    children: [{ path: '', component: ExpensesComponent, pathMatch: 'full' }]
  },
  { path: 'expenses/new', component: ExpenseDetailComponent, pathMatch: 'full' },
  { path: 'expenses/:expType/:id', component: ExpenseDetailComponent },
  {
    path: 'groups', component: HomeComponent,
    children: [{ path: '', component: GroupsComponent, pathMatch: 'full' }]
  },
  { path: 'groups/new', component: GroupDetailComponent, pathMatch: 'full' },
  { path: 'groups/:id', component: GroupDetailComponent },
  {
    path: 'settings', component: HomeComponent,
    children: [{ path: '', component: SettingsComponent, pathMatch: 'full' }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
