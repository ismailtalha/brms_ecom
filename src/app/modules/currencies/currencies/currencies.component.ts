import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  currencyRecords: any = {
    data: [],
    cols: [
      { field: 'Name', header: 'Name' },
      { field: 'Code', header: 'Code ' },
      { field: 'OpeningQty', header: 'Opening Quantity' },
      { field: 'OpeningAmount', header: 'Opening Amount' }
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
    this.dataService.getCurrencies().subscribe((res: any) => {
      if (res?.code === 200) {
        this.currencyRecords.data = [...res?.data];
        this.loader.stop();
      } else {
        this.loader.stop();
      }
    }, (err) => {
      console.log(err);
      this.loader.stop();
    });
  }

  onEdit(data) {
    this.router.navigate(['/currencies/edit-currency', data?.Id]);
  }

  onDelete(data) {
    var r = confirm('Are Your Sure Your Want to delete?');
    if (r === true) {
      this.loader.start();
    this.dataService.deleteCurrency(data?.Id).subscribe((res: any) => {
     this.loader.stop();
     this.ngOnInit();
    }, (err) => {
      console.log(err);
      this.loader.stop();
    });
    }
  }

}
