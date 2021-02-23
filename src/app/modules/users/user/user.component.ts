import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userRecords: any = {
    data: [],
    cols: [
      { field: 'Name', header: 'Name' },
      { field: 'Email', header: 'Email ' },
      { field: 'Type', header: 'User Type' },
      { field: 'Password', header: 'Password' }
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
    this.dataService.getUsers().subscribe((res: any) =>{
      if(res?.code === 200) {
        this.userRecords.data = [...res?.data];
        this.loader.stop();
      } else {
        this.loader.stop();
      }
    },(err)=>{
      console.log(err);
      this.loader.stop();
    });
  }

  onEdit(data) {
    this.router.navigate(['/users/edit-user', data?.id]);
  }

  onDelete(data) {
    var r = confirm("Are Your Sure Your Want to delete?");
    if (r === true) {
      this.loader.start();
    this.dataService.deleteUser(data?.id).subscribe((res: any) =>{
     console.log(res);
     this.loader.stop();
     this.ngOnInit();
    },(err)=>{
      this.loader.stop();
    });
    }
  }

}
