import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';
import { CutomerComponent } from './cutomer/cutomer.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CutomerComponent,
      }
    ]
  },
  {
    path: 'addNewCustomer',
    component: AddNewCustomerComponent
  },
  {
    path: 'edit-customer/:id',
    component: AddNewCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
