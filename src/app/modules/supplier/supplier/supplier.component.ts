import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplierRecord: any = {
    data: [],
    cols: [
      { field: 'Name', header: 'Name' },
      { field: 'Phone', header: 'Phone Number' },
      { field: 'OpeningBalance', header: 'Opening Balance' }
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
    this.dataService.getSupplier().subscribe((res: any) =>{
      console.log(res);
      if(res?.code === 200) {
        this.supplierRecord.data = [...res?.data];
        this.loader.stop();
      } else {
        this.loader.stop();
      }
    },(err)=>{
      console.log(err);
      this.loader.stop();
    });
  }

  onDelete(data) {
    console.log(data?.id);
    var r = confirm("Are Your Sure Your Want to delete?");
    if (r === true) {
      this.loader.start();
      this.dataService.deleteSupplier(data?.id).subscribe((res: any) =>{
      console.log(res);
      this.loader.stop();
      this.ngOnInit();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
  }

  onEdit(data) {
    console.log(data);
    this.router.navigate(['/supplier/edit-supplier', data?.id]);
  }

}

