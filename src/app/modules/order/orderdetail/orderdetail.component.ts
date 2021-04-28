import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { GetDataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  singleitem: {};
   itemslist: any = [];
   itemsPerPage=5;
   selected:any;

  constructor(public cartservice:GetDataService,private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getsingleorder()
  }
  statusarr = [{'orderstatusno':'01' , 'orderstatusname' : "Pending"},
  {'orderstatusno':'02' , 'orderstatusname' : "Dispatched"},
  {'orderstatusno':'03' , 'orderstatusname' : "Delivered"},
  {'orderstatusno':'04' , 'orderstatusname' : "Invoiced"},
  {'orderstatusno':'05' , 'orderstatusname' : "Closed"}]

  getsingleorder() {

    if (this.route.snapshot.params.id) {
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getsingleorder(id).subscribe((res:any) => {

        this.singleitem = {};
        this.itemslist = [];
        this.singleitem = res ;
        this.selected = this.getstatus(res.orderstatusno)
        this.itemslist = this.singleitem["sldsaleorderdtls"];
        console.log(res?.data)
        this.loader.stop();
      })
    }
    }
getstatus(no)
{
 let value = this.statusarr.filter((sttaus) => sttaus.orderstatusno == no)
 return value[0];
}
    changestatus()
    {
      
      this.loader.start();
      this.singleitem["orderstatusno"] = this.selected.orderstatusno;
      this.singleitem["orderstatusname"] = this.selected.orderstatusname;
      this.dataService.createorder(this.singleitem).subscribe((res:any) => {
        this.loader.stop();
        this.selected.orderstatusno = res.orderstatusno
        alert('done')
      })
     
    }
}
