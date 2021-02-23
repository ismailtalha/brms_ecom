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
