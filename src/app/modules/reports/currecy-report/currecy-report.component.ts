import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-currecy-report',
  templateUrl: './currecy-report.component.html',
  styleUrls: ['./currecy-report.component.css']
})
export class CurrecyReportComponent implements OnInit {
 
  form = new FormGroup({
    id: new FormControl(null, Validators.required),
    fromdate: new FormControl(''),
    todate: new FormControl('')
  });
  currencies: any = {
    data: [],
    cols: [
      { field: 'UserName', header: 'UserName' },
      { field: 'AccountName', header: 'Account Name' },
      { field: 'InvoiceNo', header: 'InvoiceNo' },
      { field: 'Qty', header: 'Qty' },
      { field: 'CostPrice', header: 'CostPrice' },
      { field: 'Description', header: 'Description' },
      { field: 'Date', header: 'DetailDate' }
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };
  date = new FormGroup({
    FromDate: new FormControl(null, Validators.required),
    ToDate: new FormControl(null, Validators.required)
  });
  isFilter = false;
  allcurrencies: any[];
  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService) { }
   
  ngOnInit(): void {
    this.loader.start();
    this.dataService.getCurrencies().subscribe((currencies: any) => {
      if (currencies?.code === 200) {
        this.allcurrencies = [...currencies?.data];
      }
      this.loader.stop();
    }, (err) => {
      this.loader.stop();
    });
  }

  getreport()
    {
      this.loader.start();
      const payload = {
        id: Number(this.form.getRawValue().id),
        FromDate: this.form.getRawValue().fromdate,
        ToDate: this.form.getRawValue().todate
      }
      this.dataService.getcurrencyreport(payload).subscribe((currencies: any) => {
        if (currencies?.code === 200) {
          this.currencies.data = [...currencies?.data];
        }
        this.loader.stop();
      }, (err) => {
        this.loader.stop();
      });
    }
  

}
