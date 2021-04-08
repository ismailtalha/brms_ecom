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
   itemsPerPage=5

  constructor(public cartservice:GetDataService,private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getsingleorder()
  }

  getsingleorder() {

    if (this.route.snapshot.params.id) {
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getsingleorder(id).subscribe((res:any) => {
debugger
        this.singleitem = {};
        this.itemslist = [];
        this.singleitem = res ;
        this.itemslist = this.singleitem["sldsaleorderdtls"];
        console.log(res?.data)
        this.loader.stop();
      })
    }
    }
}
