import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewPaymentsComponent,
      }   
    ]
  },
  {
    path: 'addNewPayment',
    component: AddPaymentComponent
  },
  {
    path: 'edit-payment/:id',
    component: AddPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
