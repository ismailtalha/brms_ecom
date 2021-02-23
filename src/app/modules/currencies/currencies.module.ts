import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './currencies/currencies.component';
import { AddNewCurrenciesComponent } from './add-new-currencies/add-new-currencies.component';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CurrenciesComponent, AddNewCurrenciesComponent],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    CurrenciesRoutingModule
  ]
})
export class CurrenciesModule { }
