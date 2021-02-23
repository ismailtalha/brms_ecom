import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewPaymentsComponent, AddPaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    TableModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
