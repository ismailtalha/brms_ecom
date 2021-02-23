import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { trigger,state,style,transition,animate } from '@angular/animations';

@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.css'],
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
export class ViewSalesComponent implements OnInit {
  accountRecord: any = {
    data: [],
    cols: [
      { field: 'Date', header: 'Date' },
      { field: 'AccountName', header: 'Account Name' },
      { field: 'InvoiceNo', header: 'Invoice Number' }
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };
  currencies: any;
  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router) { }

  ngOnInit(): void {
    this.loader.start();
    this.dataService.getSalesRecords().subscribe((res: any) =>{
        this.accountRecord.data = [...res];
        console.log(this.accountRecord)
        this.loader.stop();
    },(err)=>{
      console.log(err);
      this.loader.stop();
    });

    this.loader.start();
    this.dataService.getCurrencies().subscribe((res: any) =>{
        if(res?.code === 200){
          this.currencies = [...res?.data];
        }
        this.loader.stop();
    },(err)=>{
      console.log(err);
      this.loader.stop();
    });
  }


  onDelete(data) {
    let r = confirm('Are Your Sure Your Want to delete?');
    if (r === true) {
      this.loader.start();
      this.dataService.deleteSales(data?.SaleId).subscribe((res: any) => {
      this.ngOnInit();
      this.loader.stop();
      }, (err) => {
        console.log(err);
        this.loader.stop();
      });
    }
  }

  onEdit(data) {
    this.router.navigate(['/sales/edit-sale', data?.SaleId]);
  }

  getCurrencyName(id) {
    return this.currencies?.find( res => res.Id === id);
  }

}
