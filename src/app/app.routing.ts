import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'age',
    pathMatch: 'full',
  },
  {
    path: '', component: BlankLayoutComponent, children: [
      { path: 'age', loadChildren: './modules/ageverification/ageverification.module#AgeverificationModule', canActivate: [AuthGuardService] }
    ]
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
        loadChildren: './modules/shop/shop.module#ShopModule', canActivate: [AuthGuardService]
      },
      {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule', canActivate: [AuthGuardService]
      },
      {
        path: 'company',
        loadChildren: './modules/company/company.module#CompanyModule', canActivate: [AuthGuardService]
      },
      {
        path: 'order',
        loadChildren: './modules/order/order.module#OrderModule', canActivate: [AuthGuardService]
      },
      {
        path: 'adminpanel',
        loadChildren: './modules/adminpanel/adminpanel.module#AdminpanelModule', canActivate: [AuthGuardService]
      },
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
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
