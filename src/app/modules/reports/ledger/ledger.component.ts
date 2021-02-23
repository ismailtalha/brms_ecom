import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl,  FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  glAccounts: any = [];
  form = new FormGroup({
    id: new FormControl(null, Validators.required),
    fromdate: new FormControl(''),
    todate: new FormControl('')
  });
  legderReport: any = {
    data: [],
    cols: [
      { field: 'Date', header: 'Date' },
      { field: 'Description', header: 'Description' },
      { field: 'Debit', header: 'Debit' },
      { field: 'Credit', header: 'Credit' },
      { field: 'Balance', header: 'Balance' }
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };
  creditAmount: any = 0;
  debitAmount: any = 0;
  balance: any = 0;
  openingBalane: any = 0;

  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loader.start();
    this.dataService.getAccounts().subscribe((glAccounts: any) => {
      if (glAccounts?.code === 200) {
        this.glAccounts = [...glAccounts?.data];
      }
      this.loader.stop();
    }, (err) => {
      this.loader.stop();
    });
  }

  onLedgerReport() {
    this.loader.start();
    const payload = {
      id: Number(this.form.getRawValue().id),
      fromdate: this.form.getRawValue().fromdate,
      todate: this.form.getRawValue().todate
    };

    this.dataService.getLedgerReports(payload).subscribe((res: any) => {
      if (res?.data?.list.length === 0) {
        this.toastr.error('No record found', 'Error');
      } else {
        this.creditAmount = 0;
        this.debitAmount = 0;
        this.balance = 0;
        this.legderReport.data = [...res?.data?.list];
        if (this.legderReport.data.length > 0) {
          this.openingBalane = this.legderReport.data[0]?.OpeningBalance;
        }
        this.legderReport.data.forEach(element => {
          this.creditAmount = this.creditAmount + element?.Credit;
          this.debitAmount = this.debitAmount + element?.Debit;
        });
        this.balance = res?.data.totalbalance;
      }
      this.loader.stop();
    }, (err) => {
      this.loader.stop();
      this.toastr.error(err, 'Error');
    });
  }
}
