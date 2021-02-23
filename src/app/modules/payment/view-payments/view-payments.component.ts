import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.css']
})
export class ViewPaymentsComponent implements OnInit {
  customerRecord: any = {
    data: [],
    cols: [
      { field: 'FromAccountName', header: 'From Account Name' },
      { field: 'FromTransactionType', header: 'Transaction Type' },
      { field: 'Amount', header: 'Amount' },
      { field: 'ToAccountName', header: 'To Account Name' },
      { field: 'ToTransactionType', header: 'Transaction Type' },
     
      { field: 'Description', header: 'Description' }
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };
  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router) { }

  ngOnInit(): void {
    this.loader.start();
    this.dataService.getPayments().subscribe((res: any) => {
        this.customerRecord.data = [...res];
        this.loader.stop();
    }, (err) => {
      console.log(err);
      this.loader.stop();
    });
  }

  onDelete(data) {
    var r = confirm("Are Your Sure Your Want to delete?");
    if (r === true) {
      this.loader.start();
      this.dataService.deletePayment(data?.Id).subscribe((res: any) =>{
      this.loader.stop();
      this.ngOnInit();
      }, (err) => {
        console.log(err);
        this.loader.stop();
      });
    }
  }

  onEdit(data) {
    this.router.navigate(['/payment/edit-payment', data?.Id]);
  }

}
