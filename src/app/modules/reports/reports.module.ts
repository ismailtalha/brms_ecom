import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';

import { StockReportComponent } from './stock-report/stock-report.component';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule } from '@angular/forms';
import { GeneralReportComponent } from './general-report/general-report.component';
import { LedgerReportComponent } from './ledger-report/ledger-report.component';
import { CustomerLedgerReportComponent } from './customer-ledger-report/customer-ledger-report.component';
import { LedgerComponent } from './ledger/ledger.component';
import { CurrecyReportComponent } from './currecy-report/currecy-report.component';
import { BalanceReportComponent } from './balance-report/balance-report.component';


@NgModule({
  declarations: [StockReportComponent, GeneralReportComponent, LedgerReportComponent, CustomerLedgerReportComponent, LedgerComponent, CurrecyReportComponent, BalanceReportComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    TableModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }
