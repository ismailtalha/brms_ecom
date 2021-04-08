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
  constructor(private dataService: DataService,
     public cartservice: GetDataService,
      private toastr: ToastrService,
       private loader: NgxUiLoaderService,
       private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getorders();
  }

  getorders() {
      this.loader.start();
      this.dataService.getOrders().subscribe((res:any) => {
debugger
        
        this.orders = res ;
        this.loader.stop();
      })
    }
  }