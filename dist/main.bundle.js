webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_home_home_component__ = __webpack_require__("../../../../../src/app/components/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__ = __webpack_require__("../../../../../src/app/components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_expense_detail_expense_detail_component__ = __webpack_require__("../../../../../src/app/components/expense-detail/expense-detail.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_2__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'expenses', component: __WEBPACK_IMPORTED_MODULE_2__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'persons', component: __WEBPACK_IMPORTED_MODULE_2__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'groups', component: __WEBPACK_IMPORTED_MODULE_2__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'expenses/new', component: __WEBPACK_IMPORTED_MODULE_4__components_expense_detail_expense_detail_component__["a" /* ExpenseDetailComponent */], pathMatch: 'full' },
    { path: 'expenses/:expType/:id', component: __WEBPACK_IMPORTED_MODULE_4__components_expense_detail_expense_detail_component__["a" /* ExpenseDetailComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(router, afAuth) {
        this.router = router;
        this.afAuth = afAuth;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.afAuth.authState.subscribe(function (user) {
            if (!user) {
                _this.router.navigateByUrl("/login");
            }
        });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MaterialModule */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills__ = __webpack_require__("../../../../../src/polyfills.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2__ = __webpack_require__("../../../../angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_cdk_table__ = __webpack_require__("../../../cdk/esm5/table.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_cdk_accordion__ = __webpack_require__("../../../cdk/esm5/accordion.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_home_home_component__ = __webpack_require__("../../../../../src/app/components/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_login_login_component__ = __webpack_require__("../../../../../src/app/components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_expenses_expenses_component__ = __webpack_require__("../../../../../src/app/components/expenses/expenses.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_persons_persons_component__ = __webpack_require__("../../../../../src/app/components/persons/persons.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_groups_groups_component__ = __webpack_require__("../../../../../src/app/components/groups/groups.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_expense_detail_expense_detail_component__ = __webpack_require__("../../../../../src/app/components/expense-detail/expense-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_expense_service__ = __webpack_require__("../../../../../src/app/services/expense.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_messages_service__ = __webpack_require__("../../../../../src/app/services/messages.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_facebook_service__ = __webpack_require__("../../../../../src/app/services/facebook.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























var MaterialModule = (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["K" /* NgModule */])({
            exports: [
                __WEBPACK_IMPORTED_MODULE_10__angular_cdk_table__["m" /* CdkTableModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_cdk_accordion__["c" /* CdkAccordionModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["b" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["c" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["d" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["e" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["f" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["h" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["F" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["i" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["j" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["k" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["l" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["m" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["o" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["p" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["q" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["r" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["s" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["t" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["u" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["v" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["w" /* MatRippleModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["x" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["z" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["B" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["A" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["D" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["E" /* MatSortModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["G" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["H" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["I" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_25__angular_material__["J" /* MatTooltipModule */],
            ],
            imports: [__WEBPACK_IMPORTED_MODULE_13__app_routing_module__["a" /* AppRoutingModule */]]
        })
    ], MaterialModule);
    return MaterialModule;
}());

var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_expenses_expenses_component__["a" /* ExpensesComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_persons_persons_component__["a" /* PersonsComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_groups_groups_component__["a" /* GroupsComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_expense_detail_expense_detail_component__["a" /* ExpenseDetailComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* HttpModule */],
                MaterialModule,
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_13__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_16_angularfire2_auth__["b" /* AngularFireAuthModule */]
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_25__angular_material__["a" /* MAT_DATE_LOCALE */], useValue: 'es-ES' },
                __WEBPACK_IMPORTED_MODULE_21__angular_common__["d" /* DecimalPipe */],
                __WEBPACK_IMPORTED_MODULE_22__services_expense_service__["a" /* ExpenseService */],
                __WEBPACK_IMPORTED_MODULE_24__services_facebook_service__["a" /* FacebookService */],
                __WEBPACK_IMPORTED_MODULE_23__services_messages_service__["a" /* MessagesService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//platformBrowserDynamic().bootstrapModule(AppModule); 


/***/ }),

/***/ "../../../../../src/app/components/expense-detail/expense-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    margin: 30px;\r\n  }\r\n  \r\n  .example-container > * {\r\n    width: 100%;\r\n  }\r\n\r\n  \r\n.fab {\r\n  position: fixed;\r\n  right: 20px;\r\n  bottom: 15px;\r\n  margin-left: -28px;\r\n}\r\n\r\n.button-row {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -ms-flex-pack: distribute;\r\n      justify-content: space-around;\r\n}\r\n\r\n.spacer {\r\n  -webkit-box-flex: 1;\r\n      -ms-flex: 1 1 auto;\r\n          flex: 1 1 auto;\r\n}\r\n\r\n.error-snack-bar {\r\n  background: darkred;\r\n}\r\n\r\n.card {\r\n  max-width: 900px;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n  height: auto;\r\n}\r\n\r\n.form {\r\n  min-width: 150px;\r\n  width: 100%;\r\n}\r\n.full-width {\r\n  width: 100%;\r\n}\r\n\r\n.right-align {\r\n  text-align: right;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/expense-detail/expense-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\r\n  <button mat-icon-button routerLink=\"/expenses\">\r\n    <mat-icon>arrow_back</mat-icon>\r\n  </button>\r\n  <h1>{{ saveFunction == 'addExpense' && expense.id === null ? 'Create Expense' : 'Update Expense' }}</h1>\r\n  <span class=\"spacer\"></span>\r\n  <button *ngIf=\"expense.id\" mat-icon-button color=\"warn\" (click)=\"delete()\">\r\n    <mat-icon>delete</mat-icon>\r\n  </button>\r\n</mat-toolbar>\r\n\r\n<div *ngIf=\"loading\">\r\n  <mat-progress-bar mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\r\n</div>\r\n\r\n<mat-card *ngIf=\"saveFunction == 'addExpense' || ( expense.id != null )\" class=\"card\">\r\n  <h3 class=\"subheading-2\">Expense</h3>\r\n  <div class=\"example-container\">\r\n    <form [formGroup]=\"expenseForm\" class=\"form\">\r\n\r\n      <mat-form-field class=\"full-width\">\r\n        <input matInput placeholder=\"Title\" [formControl]=\"title\" [(ngModel)]=\"expense.title\" [(value)]=\"expense.title\" [disabled]=\"loading\">\r\n        <mat-error *ngIf=\"title.invalid\">Required field</mat-error>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field class=\"full-width\">\r\n        <input matInput [matDatepicker]=\"picker\" placeholder=\"Date\" [formControl]=\"date\" [(ngModel)]=\"expense.date\" [(value)]=\"expense.date\"\r\n          [disabled]=\"loading\">\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker></mat-datepicker>\r\n        <mat-error *ngIf=\"date.invalid\">Insert a valid date</mat-error>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field class=\"full-width\">\r\n        <input matInput placeholder=\"Total Amount\" type=\"text\" class=\"right-align\" [formControl]=\"totalAmount\" [(ngModel)]=\"formattedAmount\"\r\n          (blur)=\"transformAmount($event)\" [(value)]=\"formattedAmount\">\r\n        <span matPrefix>ARS</span>\r\n        <mat-error *ngIf=\"totalAmount.invalid\">Insert a valid amount</mat-error>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field class=\"full-width\">\r\n        <mat-chip-list #chipList class=\"full-width\">\r\n          <mat-chip *ngFor=\"let user of expense.users\" \r\n                            (removed)=\"removeFriend($event)\"\r\n                            (removable)=\"user.id != creator.uid\"\r\n                            value=\"{{user.id}}\">\r\n            <img mat-card-avatar style=\"vertical-align:middle;\" aria-hidden src=\"{{this.getFbInfo(user.id)?.picture}}\" height=\"20\" />{{this.getFbInfo(user.id)?.name}}(ARS {{ expense.totalAmount/ expense.users.length | number:'1.2-2'}})\r\n            <mat-icon *ngIf=\"user.id != creator.uid\" matChipRemove>cancel</mat-icon>\r\n          </mat-chip>\r\n        </mat-chip-list>\r\n        <input matInput class=\"full-width\" placeholder=\"Divide between\" [matChipInputFor]=\"chipList\" [matAutocomplete]=\"auto\" [formControl]=\"friendsCtrl\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\" class=\"full-width\" (optionSelected)=\"friendSelection($event)\">\r\n          <mat-optgroup label=\"Friends\">\r\n            <mat-option *ngFor=\"let friend of filteredFriends | async\" [value]=\"friend.id\">\r\n              <img mat-card-avatar style=\"vertical-align:middle;\" aria-hidden src=\"{{friend.picture}}\" height=\"25\" />\r\n              <span>{{ friend.name }}</span>\r\n            </mat-option>\r\n          </mat-optgroup>\r\n        </mat-autocomplete>\r\n        <mat-icon matSuffix>search</mat-icon>\r\n      </mat-form-field>\r\n\r\n    </form>\r\n\r\n\r\n\r\n    <div class=\"button-row\">\r\n      <button mat-fab color=\"primary\" class=\"fab\" (click)=\"save()\">\r\n        <mat-icon>done</mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/components/expense-detail/expense-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpenseDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_expense__ = __webpack_require__("../../../../../src/app/model/expense.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operators_startWith__ = __webpack_require__("../../../../rxjs/_esm5/operators/startWith.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operators_map__ = __webpack_require__("../../../../rxjs/_esm5/operators/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_expense_service__ = __webpack_require__("../../../../../src/app/services/expense.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_facebook_service__ = __webpack_require__("../../../../../src/app/services/facebook.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_messages_service__ = __webpack_require__("../../../../../src/app/services/messages.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_first__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/first.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};














var ExpenseDetailComponent = (function () {
    function ExpenseDetailComponent(route, router, snackBar, db, decimalPipe, afAuth, expenseService, facebookService, messageService) {
        this.route = route;
        this.router = router;
        this.snackBar = snackBar;
        this.db = db;
        this.decimalPipe = decimalPipe;
        this.afAuth = afAuth;
        this.expenseService = expenseService;
        this.facebookService = facebookService;
        this.messageService = messageService;
        this.loading = true;
        this.friends = [];
        this.formattedAmount = '';
        this.creator = this.afAuth.auth.currentUser.providerData[0];
        this.expense = Object(__WEBPACK_IMPORTED_MODULE_4__model_expense__["a" /* InitialExpense */])(this.creator.uid);
        this.title = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["k" /* Validators */].required]);
        this.date = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["k" /* Validators */].required]);
        this.totalAmount = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]({ disabled: true }, [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["k" /* Validators */].required]);
        this.friendsCtrl = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]('');
        this.expenseForm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormGroup */]({
            expense: this.title,
            date: this.date,
            totalAmount: this.totalAmount,
            friendsCtrl: this.friendsCtrl
        });
    }
    ExpenseDetailComponent.prototype.ngAfterViewInit = function () {
        this.getExpense();
        this.getFriends();
    };
    ExpenseDetailComponent.prototype.getExpense = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var id, expType, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = this.route.snapshot.paramMap.get('id');
                        expType = this.route.snapshot.paramMap.get('expType');
                        if (!id) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.expenseService.getExpense(id, expType).first().toPromise()
                                .catch(function (e) {
                                _this.messageService.error(e.message);
                                return Object(__WEBPACK_IMPORTED_MODULE_4__model_expense__["a" /* InitialExpense */])(_this.creator.uid);
                            })];
                    case 1:
                        _a.expense = _b.sent();
                        this.formattedAmount = this.decimalPipe.transform(this.expense.totalAmount, '1.2-2');
                        this.saveFunction = 'updateExpense';
                        return [3 /*break*/, 3];
                    case 2:
                        this.saveFunction = 'addExpense';
                        _b.label = 3;
                    case 3:
                        this.loading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpenseDetailComponent.prototype.getFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.filteredFriends = this.friendsCtrl.valueChanges
                            .pipe(Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators_startWith__["a" /* startWith */])(''), Object(__WEBPACK_IMPORTED_MODULE_9_rxjs_operators_map__["a" /* map */])(function (val) { return _this.filter(val); }));
                        _a = this;
                        return [4 /*yield*/, this.facebookService.getFriends().catch(function (e) { return _this.messageService.error(e.message); })];
                    case 1:
                        _a.friends = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpenseDetailComponent.prototype.filter = function (val) {
        var _this = this;
        return this.friends.filter(function (f) {
            return !_this.expense.users.find(function (userRef) { return userRef.id === f.id; }) &&
                f.name.toLowerCase().includes(val.toLowerCase());
        });
    };
    ExpenseDetailComponent.prototype.goBack = function () {
        this.router.navigate(['/expenses']);
    };
    ExpenseDetailComponent.prototype.save = function () {
        var _this = this;
        if (this.expenseForm.valid) {
            this.updateIndividualAmounts();
            this.expenseService[this.saveFunction](this.expense)
                .then(function (_) { return _this.goBack(); })
                .catch(function (e) { return _this.messageService.error(e.message); });
        }
    };
    ExpenseDetailComponent.prototype.delete = function () {
        var _this = this;
        this.expenseService.deleteExpense(this.expense)
            .then(function (res) { return _this.goBack(); })
            .catch(function (e) { return _this.messageService.error(e.message); });
    };
    ExpenseDetailComponent.prototype.transformAmount = function (element) {
        try {
            this.formattedAmount = this.decimalPipe.transform(+this.formattedAmount.replace(/,/g, ''), '1.2-2');
            element.target.value = this.formattedAmount;
            this.expense.totalAmount = +this.formattedAmount.replace(/,/g, '');
            this.totalAmount.setErrors(null);
        }
        catch (error) {
            this.totalAmount.setErrors({ invalid: true });
        }
    };
    ExpenseDetailComponent.prototype.friendSelection = function (event) {
        if (!this.expense.users.find(function (user) { return user.id === event.option.value; })) {
            this.expense.users.push({ id: event.option.value,
                payed: false });
        }
    };
    ExpenseDetailComponent.prototype.removeFriend = function (event) {
        this.expense.users = this.expense.users.filter(function (user) { return user.id != event.chip.value; });
    };
    ExpenseDetailComponent.prototype.getFbInfo = function (id) {
        if (id === this.creator.uid) {
            return {
                id: this.creator.uid,
                name: this.creator.displayName,
                picture: this.creator.photoURL
            };
        }
        else {
            return this.friends.find(function (f) { return f.id === id; });
        }
    };
    ExpenseDetailComponent.prototype.updateIndividualAmounts = function () {
        var _this = this;
        this.expense.users.forEach(function (u) {
            return u.individualAmount = _this.expense.totalAmount / _this.expense.users.length;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])('chipList'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__angular_material__["g" /* MatChipList */])
    ], ExpenseDetailComponent.prototype, "chiplist", void 0);
    ExpenseDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-expense-detail',
            template: __webpack_require__("../../../../../src/app/components/expense-detail/expense-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/expense-detail/expense-detail.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["C" /* MatSnackBar */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["d" /* DecimalPipe */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_10__services_expense_service__["a" /* ExpenseService */],
            __WEBPACK_IMPORTED_MODULE_11__services_facebook_service__["a" /* FacebookService */],
            __WEBPACK_IMPORTED_MODULE_12__services_messages_service__["a" /* MessagesService */]])
    ], ExpenseDetailComponent);
    return ExpenseDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/expenses/expenses.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".fab {\r\n    position: fixed;\r\n    right: 20px;\r\n    bottom: 15px;\r\n    margin-left: -28px;\r\n  }\r\n\r\n.card {\r\n  max-width: 900px;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.header-container{\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n      -ms-flex-pack: justify;\r\n          justify-content: space-between;\r\n}\r\n\r\n.amount-container{\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -webkit-box-pack: baseline;\r\n      -ms-flex-pack: baseline;\r\n          justify-content: baseline;\r\n}\r\n.amount{\r\n    -webkit-margin-before: 0px;\r\n    -webkit-margin-after: 0px;\r\n    -webkit-margin-start: 0px;\r\n    -webkit-margin-end: 0px;\r\n    -ms-flex-item-align: center;\r\n        -ms-grid-row-align: center;\r\n        align-self: center;\r\n    min-width: 140px;\r\n    text-align-last: end;\r\n  }\r\n\r\n.total-amount {\r\n  text-align-last: end;\r\n}\r\n\r\n.individual-amount{\r\n  font-weight: normal;\r\n  min-width: 100px;\r\n  text-align-last: end;\r\n}\r\n\r\n.list {\r\n  padding: 0px;\r\n}\r\n\r\n.mat-card-title{\r\n  font-size: 22px;\r\n}\r\n\r\n.user-amount{\r\n    min-width: 140px;\r\n    text-align-last: end;\r\n  }\r\n\r\n  .mat-list-item-content{\r\n  padding: 0px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/expenses/expenses.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!(ownExpenses | async)\">\r\n    <mat-progress-bar mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\r\n</div>\r\n<mat-card *ngFor=\"let expense of ownExpenses | async\" class=\"card\">\r\n    <div class=\"header-container\">\r\n        <mat-card-title-group>\r\n            <mat-card-title>{{expense.title | titlecase}}</mat-card-title>\r\n            <mat-card-subtitle>{{expense.date | date}}</mat-card-subtitle>\r\n        </mat-card-title-group>\r\n        <mat-card-title-group>\r\n            <mat-card-title class=\"user-amount\">ARS {{expense.totalAmount | number:'1.2-2'}}</mat-card-title>\r\n            <mat-card-subtitle class=\"total-amount\">Total ARS {{expense.totalAmount | number:'1.2-2'}}</mat-card-subtitle>\r\n        </mat-card-title-group>\r\n    </div>\r\n    <mat-divider></mat-divider>\r\n    <mat-card-content>\r\n        <mat-list class=\"list\">\r\n            <h5 mat-subheader class=\"list\">Creator</h5>\r\n            <mat-list-item class=\"list\">\r\n                    <img matListAvatar src=\"{{this.getFbInfo(expense.creator)?.picture}}\">\r\n                    <h3 matLine> {{this.getFbInfo(expense.creator)?.name}} </h3>\r\n                    <h3 class=\"individual-amount\">ARS {{this.getCreatorUser(expense).individualAmount | number:'1.2-2'}}</h3>\r\n                    <h5 matLine> Payed </h5>\r\n            </mat-list-item>\r\n            <h5 mat-subheader class=\"list\">Participants</h5>\r\n            <div *ngFor=\"let user of expense.users\" class=\"list\">\r\n                <mat-list-item *ngIf=\"user.id !== expense.creator\">\r\n                    <img matListAvatar src=\"{{this.getFbInfo(user.id)?.picture}}\">\r\n                    <h3 matLine>{{this.getFbInfo(user.id)?.name}} </h3>\r\n                    <h5 matLine> Payed </h5>\r\n                    <h3 class=\"individual-amount\">ARS {{user.individualAmount | number:'1.2-2'}}</h3>\r\n                </mat-list-item>\r\n            </div>\r\n        </mat-list>\r\n    </mat-card-content>\r\n    <mat-divider></mat-divider>\r\n    <mat-card-actions align=\"start\">\r\n        <a mat-button routerLink=\"/expenses/expenses/{{expense.id}}\">EDIT</a>\r\n        <button mat-button>PAY</button>\r\n        <button mat-button>DELETE</button>\r\n    </mat-card-actions>\r\n</mat-card>\r\n\r\n\r\n<a mat-fab color=\"primary\" routerLink=\"/expenses/new\" class=\"fab\">\r\n    <mat-icon>add</mat-icon>\r\n</a>"

/***/ }),

/***/ "../../../../../src/app/components/expenses/expenses.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpensesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_expense_service__ = __webpack_require__("../../../../../src/app/services/expense.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_messages_service__ = __webpack_require__("../../../../../src/app/services/messages.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_facebook_service__ = __webpack_require__("../../../../../src/app/services/facebook.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ExpensesComponent = (function () {
    function ExpensesComponent(expenseService, messagesService, afAuth, facebookService, messageService) {
        this.expenseService = expenseService;
        this.messagesService = messagesService;
        this.afAuth = afAuth;
        this.facebookService = facebookService;
        this.messageService = messageService;
        this.friends = [];
        this.user = this.afAuth.auth.currentUser.providerData[0];
    }
    ExpensesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ownExpenses = this.expenseService.getOwnExpenses()
            .catch(function (e) {
            _this.messagesService.error(e.message);
            return [];
        });
        this.facebookService.getFriends()
            .then(function (friends) { return _this.friends = friends; })
            .catch(function (e) { return _this.messageService.error(e.message); });
    };
    ExpensesComponent.prototype.getFbInfo = function (id) {
        if (id === this.user.uid) {
            return {
                id: this.user.uid,
                name: this.user.displayName,
                picture: this.user.photoURL
            };
        }
        else {
            return this.friends.find(function (f) { return f.id === id; });
        }
    };
    ExpensesComponent.prototype.getCreatorUser = function (expense) {
        return expense.users.find(function (u) { return u.id === expense.creator; });
    };
    ExpensesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-expenses',
            template: __webpack_require__("../../../../../src/app/components/expenses/expenses.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/expenses/expenses.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_expense_service__["a" /* ExpenseService */],
            __WEBPACK_IMPORTED_MODULE_3__services_messages_service__["a" /* MessagesService */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_5__services_facebook_service__["a" /* FacebookService */],
            __WEBPACK_IMPORTED_MODULE_3__services_messages_service__["a" /* MessagesService */]])
    ], ExpensesComponent);
    return ExpensesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/groups/groups.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/groups/groups.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  groups works!\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/groups/groups.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GroupsComponent = (function () {
    function GroupsComponent() {
    }
    GroupsComponent.prototype.ngOnInit = function () {
    };
    GroupsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-groups',
            template: __webpack_require__("../../../../../src/app/components/groups/groups.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/groups/groups.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], GroupsComponent);
    return GroupsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    height: 100%;\r\n  }\r\n\r\n.demo-tab-group {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n      -ms-flex-pack: justify;\r\n          justify-content: space-between;\r\n}\r\n\r\n.tab{\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.demo-tab-content {\r\n  padding: 16px;\r\n}\r\n\r\n.example-spacer {\r\n  -webkit-box-flex: 1;\r\n      -ms-flex: 1 1 auto;\r\n          flex: 1 1 auto;\r\n}\r\n\r\n.logout {\r\n  color: red;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <mat-toolbar color=\"primary\" class=\"toolbar\">\r\n    <h1>Friend Service</h1>\r\n    <span class=\"example-spacer\"></span>\r\n    <button mat-icon-button class=\"logout\" (click)=\"logout()\">\r\n      <mat-icon>highlight_off</mat-icon>\r\n    </button>\r\n  </mat-toolbar>\r\n\r\n  <mat-tab-group class=\"demo-tab-group\">\r\n    <mat-tab class=\"tab\" label=\"Expenses\">\r\n        <ng-template mat-tab-label>\r\n            <mat-icon>assignment</mat-icon>\r\n            Expenses\r\n        </ng-template>\r\n        <app-expenses></app-expenses>\r\n    </mat-tab>\r\n    <mat-tab class=\"tab\" label=\"Persons\">\r\n        <ng-template mat-tab-label>\r\n            <mat-icon>person</mat-icon>\r\n            Persons\r\n        </ng-template>\r\n      <app-persons></app-persons>\r\n    </mat-tab>\r\n    <mat-tab class=\"tab\" label=\"Groups\">\r\n        <ng-template mat-tab-label>\r\n            <mat-icon>group</mat-icon>\r\n            Groups \r\n        </ng-template>\r\n        <app-groups></app-groups>\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = (function () {
    function HomeComponent(router, afAuth) {
        this.router = router;
        this.afAuth = afAuth;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.close = function () {
        this.sidenav.close();
    };
    HomeComponent.prototype.logout = function () {
        this.afAuth.auth.signOut();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])('sidenav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_material__["y" /* MatSidenav */])
    ], HomeComponent.prototype, "sidenav", void 0);
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/components/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n.back {\r\n    height: 100%;\r\n    width: 100%;\r\n}\r\n.button-row {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -ms-flex-pack: distribute;\r\n        justify-content: space-around;\r\n  }\r\n\r\n  .divider {\r\n      color: black;\r\n  }\r\n\r\n.facebook-button{\r\n    background-color: #4267b2;\r\n    color: white;\r\n    margin-right: 5px;\r\n}\r\n\r\n.google-button{\r\n    background-color: #db4437; \r\n    color: white;\r\n    margin-left: 5px;\r\n}\r\n\r\n.card {\r\n    margin: auto;\r\n    padding: 15% 0;\r\n    max-width: 300px;\r\n}\r\n\r\n  \r\n .buttons { \r\n    color:white;\r\n    width: 100%;\r\n}\r\n\r\n.full-width {\r\n  width: 100%;\r\n}\r\n\r\n.error-snack-bar {\r\n    background: red;\r\n    color: red;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"back\">\r\n    <div class=\"card\">\r\n        <div class=\"button-row\">\r\n            <h1 class=\"title\">Sign In.</h1>\r\n            <button mat-fab class=\"facebook-button\" matTooltip=\"Login with Facebook\" (click)=\"withFacebook()\">\r\n                <mat-icon svgIcon=\"facebook_icon\"></mat-icon>\r\n            </button>\r\n        </div>\r\n        <mat-slide-toggle color=\"primary\" (change)=\"rememberMe()\" [(ngModel)]=\"rememberMeChecked\" [(checked)]=\"rememberMeChecked\">Remember me</mat-slide-toggle>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__("../../../../firebase/app/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = (function () {
    function LoginComponent(afAuth, router, iconRegistry, sanitizer, snackBar) {
        var _this = this;
        this.afAuth = afAuth;
        this.router = router;
        this.snackBar = snackBar;
        this.hide = true;
        this.rememberMeChecked = true;
        this.persistance = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].Auth.Persistence.LOCAL;
        this.provider = new __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].FacebookAuthProvider();
        this.provider.addScope('user_friends');
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.afAuth.auth.getRedirectResult()
                    .then(function (c) { return localStorage.setItem('facebookToken', c.credential.accessToken); });
                _this.router.navigateByUrl("/home");
            }
        });
        iconRegistry.addSvgIcon('facebook_icon', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook-logo.svg'));
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.withFacebook = function () {
        var _this = this;
        this.afAuth.auth.setPersistence(this.persistance)
            .then(function (_) { return _this.afAuth.auth.signInWithRedirect(_this.provider); })
            .catch(function (e) { return _this.openSnackBar(e.message); });
    };
    LoginComponent.prototype.rememberMe = function (evt) {
        if (this.rememberMeChecked) {
            this.persistance = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].Auth.Persistence.LOCAL;
        }
        else {
            this.persistance = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].Auth.Persistence.SESSION;
        }
    };
    LoginComponent.prototype.openSnackBar = function (message, action) {
        if (action === void 0) { action = "OK"; }
        this.snackBar.open(message, action, {
            duration: 2000,
            extraClasses: ['error-snack-bar']
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/components/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["n" /* MatIconRegistry */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["C" /* MatSnackBar */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/persons/persons.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card {\r\n    max-width: 900px;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    margin-top: 10px;\r\n    margin-bottom: 10px;\r\n  }\r\n.name {\r\n    margin-top: 9px;\r\n    font-size: 20px;\r\n}  \r\n\r\n.header-container{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: row;\r\n            flex-direction: row;\r\n    -webkit-box-pack: justify;\r\n        -ms-flex-pack: justify;\r\n            justify-content: space-between\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/persons/persons.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!(relations | async)\">\r\n    <mat-progress-bar mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\r\n</div>\r\n\r\n<mat-card *ngFor=\"let relation of relations | async\" class=\"card\">\r\n    <div class=\"header-container\">\r\n<mat-card-header>\r\n        <img mat-card-avatar src=\"{{this.getFbInfo(relation.userId)?.picture}}\">\r\n        <mat-card-title class=\"name\">{{this.getFbInfo(relation.userId)?.name}}</mat-card-title>\r\n</mat-card-header>\r\n<mat-card-header>\r\n    <mat-card-title *ngIf=\"relation.owesMe > relation.iOwe\" class=\"name\">Owes Me ARS {{ (relation.owesMe - relation.iOwe ) | number:'1.2-2'}}</mat-card-title>\r\n    <mat-card-title *ngIf=\"relation.owesMe < relation.iOwe\" class=\"name\">I Owe ARS {{ ( relation.iOwe - relation.owesMe ) | number:'1.2-2'}}</mat-card-title>\r\n    <mat-card-title *ngIf=\"relation.owesMe === relation.iOwe\" class=\"name\">Even</mat-card-title>\r\n</mat-card-header>\r\n</div>\r\n<mat-divider></mat-divider>\r\n    <mat-card-content>\r\n\r\n    </mat-card-content>\r\n    <mat-card-actions>\r\n        <button mat-button>PAY</button>\r\n    </mat-card-actions>\r\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/components/persons/persons.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_expense_service__ = __webpack_require__("../../../../../src/app/services/expense.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_messages_service__ = __webpack_require__("../../../../../src/app/services/messages.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_facebook_service__ = __webpack_require__("../../../../../src/app/services/facebook.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PersonsComponent = (function () {
    function PersonsComponent(expenseService, messagesService, afAuth, facebookService) {
        this.expenseService = expenseService;
        this.messagesService = messagesService;
        this.afAuth = afAuth;
        this.facebookService = facebookService;
        this.friends = [];
        this.user = this.afAuth.auth.currentUser.providerData[0];
    }
    PersonsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.relations = this.expenseService.getRelations()
            .catch(function (e) {
            _this.messagesService.error(e.message);
            return [];
        });
        this.facebookService.getFriends()
            .then(function (friends) { return _this.friends = friends; })
            .catch(function (e) { return _this.messagesService.error(e.message); });
    };
    PersonsComponent.prototype.getFbInfo = function (id) {
        if (id === this.user.uid) {
            return {
                id: this.user.uid,
                name: this.user.displayName,
                picture: this.user.photoURL
            };
        }
        else {
            return this.friends.find(function (f) { return f.id === id; });
        }
    };
    PersonsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-persons',
            template: __webpack_require__("../../../../../src/app/components/persons/persons.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/persons/persons.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_expense_service__["a" /* ExpenseService */],
            __WEBPACK_IMPORTED_MODULE_2__services_messages_service__["a" /* MessagesService */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_4__services_facebook_service__["a" /* FacebookService */]])
    ], PersonsComponent);
    return PersonsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/model/expense.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = InitialExpense;
function InitialExpense(creatorId) {
    return {
        id: null,
        title: "",
        date: null,
        creator: creatorId,
        totalAmount: 0,
        users: [
            {
                id: creatorId
            }
        ]
    };
}


/***/ }),

/***/ "../../../../../src/app/services/expense.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpenseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ExpenseService = (function () {
    function ExpenseService(db, afAuth) {
        var _this = this;
        this.db = db;
        this.afAuth = afAuth;
        this.user = this.afAuth.authState.first().toPromise().then(function (user) {
            if (user) {
                return _this.user = Promise.resolve(user.providerData[0]);
            }
        });
    }
    ExpenseService.prototype.getOwnExpenses = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].fromPromise(this.user).switchMap(function (u) {
            return _this.db.collection("users/" + u.uid + "/expenses").snapshotChanges()
                .map(function (actions) {
                return actions.map(function (a) {
                    var expense = a.payload.doc.data();
                    expense.id = a.payload.doc.id;
                    return expense;
                });
            });
        });
    };
    ExpenseService.prototype.getOtherExpenses = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].fromPromise(this.user).switchMap(function (u) {
            return _this.db.collection("users/" + u.uid + "/otherExpenses").snapshotChanges()
                .map(function (actions) {
                return actions.map(function (a) {
                    var expense = a.payload.doc.data();
                    expense.id = a.payload.doc.id;
                    return expense;
                });
            });
        });
    };
    ExpenseService.prototype.getExpense = function (id, type) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].fromPromise(this.user).switchMap(function (u) {
            return _this.db.doc("users/" + u.uid + "/" + type + "/" + id).snapshotChanges()
                .map(function (doc) {
                var expense = doc.payload.data();
                expense.id = doc.payload.id;
                return expense;
            });
        });
    };
    ExpenseService.prototype.addExpense = function (expense, expenseUsers) {
        return this.db.collection("users/" + expense.creator + "/expenses").add(expense);
    };
    ExpenseService.prototype.updateExpense = function (expense) {
        return this.db.doc("users/" + expense.creator + "/expenses/" + expense.id).set(expense);
    };
    ExpenseService.prototype.deleteExpense = function (expense) {
        return this.db.doc("users/" + expense.creator + "/expenses/" + expense.id).delete();
    };
    ExpenseService.prototype.getRelations = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].fromPromise(this.user).switchMap(function (u) {
            return _this.db.collection("users/" + u.uid + "/relations").snapshotChanges()
                .map(function (actions) {
                return actions.map(function (a) { return a.payload.doc.data(); });
            });
        });
    };
    ExpenseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], ExpenseService);
    return ExpenseService;
}());



/***/ }),

/***/ "../../../../../src/app/services/facebook.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_elementAt__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/elementAt.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var FacebookService = (function () {
    function FacebookService(afAuth, http) {
        var _this = this;
        this.afAuth = afAuth;
        this.http = http;
        this.user = this.afAuth.authState.first().toPromise().then(function (user) {
            if (user) {
                return _this.user = Promise.resolve(user.providerData[0]);
            }
        });
    }
    FacebookService.prototype.getFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, this.http.get('https://graph.facebook.com/v2.12/' + user.uid +
                                '/friends?access_token=' +
                                localStorage.getItem('facebookToken') +
                                '&fields=cover,name&limit=10')
                                .map(function (facebookFriend) { return facebookFriend['data']
                                .map(function (data) { return _this.createUser(data.id, data.name, data.cover.source); }); })
                                .first().toPromise()];
                }
            });
        });
    };
    FacebookService.prototype.createUser = function (id, name, picture) {
        return { id: id, name: name, picture: picture };
    };
    FacebookService.prototype.getFbInfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user];
                    case 1:
                        user = _a.sent();
                        if (id === user.uid) {
                            return [2 /*return*/, Promise.resolve({
                                    id: user.uid,
                                    name: user.displayName,
                                    picture: user.photoURL
                                })];
                        }
                        else {
                            return [2 /*return*/, this.http.get('https://graph.facebook.com/v2.12/' + id +
                                    '?access_token=' +
                                    localStorage.getItem('facebookToken') +
                                    '&fields=cover,name')
                                    .map(function (facebookFriend) { return facebookFriend['data']
                                    .map(function (data) { return _this.createUser(data.id, data.name, data.cover.source); }); })
                                    .first().toPromise()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FacebookService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], FacebookService);
    return FacebookService;
}());



/***/ }),

/***/ "../../../../../src/app/services/messages.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessagesService = (function () {
    function MessagesService(snackBar) {
        this.snackBar = snackBar;
    }
    MessagesService.prototype.error = function (message, action) {
        if (action === void 0) { action = "OK"; }
        this.snackBar.open(message, action, {
            duration: 2000,
            extraClasses: ['error-snack-bar']
        });
    };
    MessagesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["C" /* MatSnackBar */]])
    ], MessagesService);
    return MessagesService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyDSmjUEDYakQj-uSTsMNp3VNlx1vYNJF4w",
        authDomain: "friend-service-15f6e.firebaseapp.com",
        databaseURL: "https://friend-service-15f6e.firebaseio.com",
        projectId: "friend-service-15f6e",
        storageBucket: "friend-service-15f6e.appspot.com",
        messagingSenderId: "45386676574"
    }
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../../src/polyfills.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect__ = __webpack_require__("../../../../core-js/es6/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect__ = __webpack_require__("../../../../core-js/es7/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone__ = __webpack_require__("../../../../zone.js/dist/zone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_web_animations_js__ = __webpack_require__("../../../../web-animations-js/web-animations.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_web_animations_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_web_animations_js__);







/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map