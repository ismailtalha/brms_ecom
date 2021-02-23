import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent implements OnInit {
  date = new FormGroup({
    FromDate: new FormControl(null, Validators.required),
    ToDate: new FormControl(null, Validators.required)
  });
  isFilter = false;

  stocksRecords: any = {
    data: [],
    cols: [
      { field: 'CurrencyName', header: 'Country Name' },
      { field: 'BalQty', header: 'Quantity' },
      { field: 'Rate', header: 'Rate' },
      { field: 'Amount', header: 'Amount' }
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };
  data = {
    FromDate: '',
    ToDate: ''
  };

  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loader.start();
    forkJoin(
      this.dataService.getStocks(this.data)
    )
      .subscribe(([res1]: any) => {
        this.stocksRecords.data = [...res1];
        this.loader.stop();
      }, (err) => {
        this.toastr.error(err, "Error");
        this.loader.stop();
      });
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (event.keyCode == 18) {
      event.preventDefault();
    }
  }

  search(value) {
    if (this.date.valid) {
      this.loader.start();
      if (value === 'clear') {
        this.dataService.getStocks(this.data).subscribe((res: any) => {
          this.stocksRecords.data = [...res];
          this.isFilter = false;
          this.loader.stop();
          this.date.reset();
        }, (err) => {
          this.toastr.error(err, "Error");
          this.loader.stop();
        });
      } else if (value === 'search') {
        if (this.date.value.FromDate <= this.date.value.ToDate) {
          this.dataService.getStocks(this.date.value).subscribe((res: any) => {
            this.stocksRecords.data = [...res];
            this.isFilter = true;
            this.loader.stop();
          }, (err) => {
            this.toastr.error(err, "Error");
            this.loader.stop();
          });
        } else {
          this.toastr.error('From Date Must be less than or equal to To Date', "Error");
          this.loader.stop();
        }
      }
    } else {
      this.toastr.error("Please Fill all fields", "Error");
    }
  }

  exportExcel() {
    const approved = this.stocksRecords.data.map(res => {
      return {
        'Country Name': res.CurrencyName,
        Quantity: res.BalQty,
        Rate: res.Rate,
        Amount: res.Amount
      };
    });
    this.dataService.exportExcel(approved, 'Stock');
  }

  exportPDF() {
    const header = [['Country Name', 'Quantity', 'Rate', 'Amount']];
    const approved = this.stocksRecords.data.map(res => {
      return [
        res.CurrencyName,
        res.BalQty,
        res.Rate,
        res.Amount
      ];
    });
    this.dataService.exportPdf(header, approved, 'Stock');
  }
}
