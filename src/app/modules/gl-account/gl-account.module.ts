import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GLAccountRoutingModule } from './gl-account-routing.module';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import {TableModule} from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountTypeComponent } from './account-type/account-type.component';
import { NewAccountTypeComponent } from './account-type/new-account-type/new-account-type.component';


@NgModule({
  declarations: [AccountComponent, NewAccountComponent, AccountTypeComponent, NewAccountTypeComponent],
  imports: [
    CommonModule,
    GLAccountRoutingModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class GLAccountModule { }
