import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-balance-report',
  templateUrl: './balance-report.component.html',
  styleUrls: ['./balance-report.component.css']
})
export class BalanceReportComponent implements OnInit {
  @ViewChild('journal', {static: false}) journal: ElementRef;
  date = new FormGroup({
    fromdate: new FormControl(null, Validators.required),
    todate: new FormControl(null, Validators.required)
  });
  isFilter = false;

  balanceSheetReport: any = {
    data: [],
    cols: [
      { field: 'TypeName', header: 'Account Type' }
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };

  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {}

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (event.keyCode === 18) {
      event.preventDefault();
    }
  }

  search(value) {
    if (this.date.valid) {
      this.loader.start();
      if (value === 'search') {
        if (this.date.value.fromdate <= this.date.value.todate) {
          this.dataService.getBalanceSheetReport(this.date.value).subscribe((res: any) => {
            this.balanceSheetReport.data = [...res?.data];
            this.isFilter = true;
            this.loader.stop();
          }, (err) => {
            this.toastr.error(err, 'Error');
            this.loader.stop();
          });
        } else {
          this.toastr.error('From Date Must be less than or equal to To Date', 'Error');
          this.loader.stop();
        }
      }
    } else {
      this.toastr.error('Please Fill all fields', 'Error');
    }
  }

  exportPDF() {
    this.dataService.exportPdfWithHTML(this.journal, 'Balance-Sheet');
  }
}
