import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewCurrenciesComponent } from './add-new-currencies/add-new-currencies.component';
import { CurrenciesComponent } from './currencies/currencies.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CurrenciesComponent,
      }
    ]
  },
  {
    path: 'addNewCurrency',
    component: AddNewCurrenciesComponent
  },
  {
    path: 'edit-currency/:id',
    component: AddNewCurrenciesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule { }
