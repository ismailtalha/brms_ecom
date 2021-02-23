import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { ViewSalesComponent } from './view-sales/view-sales.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [AddSalesComponent, ViewSalesComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class SalesModule { }
