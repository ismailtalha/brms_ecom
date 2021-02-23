import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountRecord: any = {
    data: [],
    cols: [
      { field: 'id', header: 'ID' },
      { field: 'Name', header: 'Account Name' },
      { field: 'TypeName', header: 'Account Type' },
      { field: 'OpeningBalance', header: 'Opening Balance' },
      { field: 'OpeningBalanceType', header: 'Opening Balance Type' }
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
    this.dataService.getAccounts().subscribe((res: any) => {
      if (res?.code === 200) {
        this.accountRecord.data = [...res?.data];
        this.loader.stop();
      } else {
        this.loader.stop();
      }
    }, (err) => {
      this.loader.stop();
    });
  }

  onDelete(data) {
    var r = confirm('Are Your Sure Your Want to delete?');
    if (r === true) {
      this.loader.start();
      this.dataService.deleteAccount(data?.id).subscribe((res: any) =>{
      console.log(res);
      this.loader.stop();
      this.ngOnInit();
      }, (err) => {
        console.log(err);
        this.loader.stop();
      });
    }
  }

  onEdit(data) {
    this.router.navigate(['/accounts/edit-account', data?.id]);
  }

}
