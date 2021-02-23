import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { trigger,state,style,transition,animate } from '@angular/animations';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.css'],
  animations: [
      trigger('rowExpansionTrigger', [
          state('void', style({
              transform: 'translateX(-10%)',
              opacity: 0
          })),
          state('active', style({
              transform: 'translateX(0)',
              opacity: 1
          })),
          transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
      ])
  ]
})
export class GeneralReportComponent implements OnInit {
  journalRecords: any = {
    data: [],
    cols: [
      { field: 'InvoiceNo', header: 'Invoice Number' },
      { field: 'headerDate', header: 'Date' }
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };

  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loader.start();
    forkJoin(
      this.dataService.getGeneralReport()
    )
    .subscribe(([res1]: any) => {
      this.journalRecords.data = [...res1];
      this.loader.stop();
    }, (err) => {
      this.toastr.error(err, "Error");
      this.loader.stop();
    });
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp (event: KeyboardEvent) {
    if (event.keyCode == 18) {
      event.preventDefault();
    }
  }

}
