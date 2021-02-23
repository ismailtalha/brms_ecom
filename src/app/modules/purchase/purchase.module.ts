import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [PurchaseComponent, AddPurchaseComponent],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    PurchaseRoutingModule,
    NgSelectModule
  ]
})
export class PurchaseModule { }
