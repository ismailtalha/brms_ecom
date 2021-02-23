import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockReportComponent } from './stock-report/stock-report.component';
import { GeneralReportComponent } from './general-report/general-report.component';
import { LedgerReportComponent } from './ledger-report/ledger-report.component';
import { CustomerLedgerReportComponent } from './customer-ledger-report/customer-ledger-report.component';
import { LedgerComponent } from './ledger/ledger.component';
import { CurrecyReportComponent } from './currecy-report/currecy-report.component';
import { BalanceReportComponent } from './balance-report/balance-report.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StockReportComponent,
      }   
    ]
  },
  {
    path: 'journal-report',
    component: GeneralReportComponent
  },
  {
    path: 'cashledger-report',
    component: LedgerReportComponent
  },
  {
    path: 'customer-ledger-report',
    component: CustomerLedgerReportComponent
  },
  {
    path: 'ledger-report',
    component: LedgerComponent
  }  ,
  {
    path: 'currency-report',
    component: CurrecyReportComponent
  },
  {
    path: 'balance-report',
    component: BalanceReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
