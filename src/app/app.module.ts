import '../polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { PersonsComponent } from './components/persons/persons.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ExpenseDetailComponent } from './components/expense-detail/expense-detail.component';
import { DecimalPipe } from '@angular/common';
import { ExpenseService } from './services/expense.service'
import { MessagesService } from './services/messages.service';
import { FacebookService } from './services/facebook.service';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { GroupsService } from './services/groups.service';
import { ExpenseCardComponent } from './components/expenses/expense-card/expense-card.component';
import { PersonCardComponent } from './components/persons/person-card/person-card.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { SelectPaymentMethodDialogComponent } from './components/select-payment-method-dialog/select-payment-method-dialog.component';
import { AuthService } from './services/auth.service';
import { SettingsComponent } from './components/settings/settings.component';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';  

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MAT_DATE_LOCALE,
} from '@angular/material';

@NgModule({
  exports: [
    CdkTableModule,
    CdkAccordionModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  imports: [AppRoutingModule]
})
export class MaterialModule { }


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ExpensesComponent,
    PersonsComponent,
    GroupsComponent,
    ExpenseDetailComponent,
    GroupDetailComponent,
    ExpenseCardComponent,
    PersonCardComponent,
    ConfirmDeleteDialogComponent,
    SelectPaymentMethodDialogComponent,
    SettingsComponent
  ],
  entryComponents: [
    ConfirmDeleteDialogComponent,
    SelectPaymentMethodDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    DecimalPipe,
    ExpenseService,
    FacebookService,
    MessagesService,
    GroupsService,
    AuthService,
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

//platformBrowserDynamic().bootstrapModule(AppModule);