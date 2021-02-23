import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';
import { SupplierComponent } from './supplier/supplier.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SupplierComponent,
      }   
    ]
  },
  {
    path: 'addNewSupplier',
    component: NewSupplierComponent
  },
  {
    path: 'edit-supplier/:id',
    component: NewSupplierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
