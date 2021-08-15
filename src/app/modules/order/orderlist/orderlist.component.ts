import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { GetDataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  orders: any;
  itemsPerPage: any = 6;
  p:any;
  constructor(private dataService: DataService,
     public cartservice: GetDataService,
      private toastr: ToastrService,
       private loader: NgxUiLoaderService,
       private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getorders();
  }

  getorders() {
    debugger;
      this.loader.start();
      let custinfo:any = JSON.parse(localStorage.getItem('customer'))
      this.dataService.getcustomerorders(custinfo.userno).subscribe((res:any) => {

        
        this.orders = res ;
        this.loader.stop();
      })
    }
  }