import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderRoutingModule } from './order-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { PrinthtmlComponent } from './printhtml/printhtml.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [CheckoutComponent, OrderlistComponent, PrinthtmlComponent, OrderdetailComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgSelectModule
  ]
})
export class OrderModule { }
