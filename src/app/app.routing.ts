import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: './modules/dashboard/dashboard.module#DashboardModule', canActivate:[AuthGuardService]
      // },
      {
        path: 'shop',
        loadChildren: './modules/shop/shop.module#ShopModule', canActivate:[AuthGuardService]
      },
      {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule', canActivate:[AuthGuardService]
      },
      {
        path: 'company',
        loadChildren: './modules/company/company.module#CompanyModule', canActivate:[AuthGuardService]
      },
      {
        path: 'order',
        loadChildren: './modules/order/order.module#OrderModule', canActivate:[AuthGuardService]
      },
      {
        path: 'users',
        loadChildren: './modules/users/users.module#UsersModule', canActivate:[AuthGuardService]
      },
      {
        path: 'accounts',
        loadChildren: './modules/gl-account/gl-account.module#GLAccountModule', canActivate: [AuthGuardService]
      },
      {
        path: 'supplier',
        loadChildren: './modules/supplier/supplier.module#SupplierModule', canActivate:[AuthGuardService]
      },
      {
        path: 'reports',
        loadChildren: './modules/reports/reports.module#ReportsModule', canActivate:[AuthGuardService]
      },
      {
        path: 'purchase',
        loadChildren: './modules/purchase/purchase.module#PurchaseModule', canActivate:[AuthGuardService]
      },
      {
        path: 'customers',
        loadChildren: './modules/customers/customers.module#CustomersModule', canActivate:[AuthGuardService]
      },
      {
        path: 'currencies',
        loadChildren: './modules/currencies/currencies.module#CurrenciesModule', canActivate: [AuthGuardService]
      },
      {
        path: 'payment',
        loadChildren: './modules/payment/payment.module#PaymentModule', canActivate:[AuthGuardService]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
