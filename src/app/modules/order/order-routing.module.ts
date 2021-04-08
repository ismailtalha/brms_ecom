import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { OrderlistComponent } from './orderlist/orderlist.component';


const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'orderlist',
    component: OrderlistComponent
  },
  {
    path: 'orderdetail/:id',
    component: OrderdetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
