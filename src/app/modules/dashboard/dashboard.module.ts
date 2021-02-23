import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import {IvyCarouselModule} from 'angular-responsive-carousel';
import { TopproductsComponent } from './topproducts/topproducts.component';
import { BestsellerComponent } from './bestseller/bestseller.component';
import { HandtoolsComponent } from './handtools/handtools.component';
import { PolicyComponent } from './policy/policy.component';
import { NgxCarouselModule } from 'ngx-light-carousel';

@NgModule({
  declarations: [DashboardComponent, TopproductsComponent, BestsellerComponent, HandtoolsComponent, PolicyComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxCarouselModule
  ]
})
export class DashboardModule { }
