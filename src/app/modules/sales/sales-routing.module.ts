import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { ViewSalesComponent } from './view-sales/view-sales.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewSalesComponent,
      }   
    ]
  },
  {
    path: 'addNewSale',
    component: AddSalesComponent
  },
  {
    path: 'edit-sale/:id',
    component: AddSalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
