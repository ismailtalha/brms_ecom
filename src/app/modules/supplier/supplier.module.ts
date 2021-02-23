import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier/supplier.component';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SupplierComponent, NewSupplierComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class SupplierModule { }
