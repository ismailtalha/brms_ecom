import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CutomerComponent } from './cutomer/cutomer.component';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CutomerComponent, AddNewCustomerComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    TableModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
