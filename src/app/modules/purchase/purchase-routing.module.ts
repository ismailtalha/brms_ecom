import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseComponent } from './purchase/purchase.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PurchaseComponent,
      }   
    ]
  },
  {
    path: 'addNewPurchase',
    component: AddPurchaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
