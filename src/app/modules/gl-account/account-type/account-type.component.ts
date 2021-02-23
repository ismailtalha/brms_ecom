import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css']
})
export class AccountTypeComponent implements OnInit {
  accountRecord: any = {
    data: [],
    cols: [
      { field: 'id', header: 'ID' },
      { field: 'Name', header: 'Account Name' },
      { field: 'Status', header: 'Status' }
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
    this.dataService.getAccountTypeRecords().subscribe((res: any) => {
      if (res?.code === 200) {
        this.accountRecord.data = [...res?.data];
        this.loader.stop();
      } else {
        this.loader.stop();
      }
    }, (err) => {
      console.log(err);
      this.loader.stop();
    });
  
  }

  onDelete(data) {
    let r = confirm('Are Your Sure Your Want to delete?');
    if (r === true) {
      this.loader.start();
      this.dataService.deleteAccountType(data?.id).subscribe((res: any) => {
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
    this.router.navigate(['/accounts/addAccount-type', data?.id]);
  }

}
