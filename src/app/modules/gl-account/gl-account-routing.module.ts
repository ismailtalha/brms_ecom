import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountTypeComponent } from './account-type/account-type.component';
import { NewAccountTypeComponent } from './account-type/new-account-type/new-account-type.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AccountComponent,
      }   
    ]
  },
  {
    path: 'addNewAccount',
    component: NewAccountComponent
  },
  {
    path: 'edit-account/:id',
    component: NewAccountComponent
  },
  {
    path: 'account-type',
    component: AccountTypeComponent
  },
  {
    path: 'addAccount-type',
    component: NewAccountTypeComponent
  },
  {
    path: 'addAccount-type/:id',
    component: NewAccountTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GLAccountRoutingModule { }
