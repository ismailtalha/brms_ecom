import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ordercheckoutmodel } from 'src/app/models/order.models';
import { DataService } from 'src/app/services/data.service';
import { GetDataService } from 'src/app/services/getdata.service';
import { MustMatch } from '../../../services/mustmatch';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router, private cookies: CookieService, public getdataservice: GetDataService,
    private dataService: DataService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService, private fb: FormBuilder ) { }
  checkout: FormGroup;
  loginform:FormGroup;
  ngOnInit(): void {
    this.checkout = this.fb.group({

      fname:['',Validators.required],
      lname:['',Validators.required],
      address:['',Validators.required],
      address2:['',null],
      email:['',Validators.email,Validators.required],
      password:['',Validators.required]
    })

    // if(this.getdataservice.customer.customerdata.length > 0)
    // {
    //   this.checkout.patchValue({


    //   })
    // }
  }

  get fcontrols() { return this.checkout.controls; }


  ordercheckout() {

    debugger
    if(this.checkout.valid)
    {
      let orderobj = this.getdataservice.ordercheckoutmodel ;

      let customer = this.getdataservice.customer.customerdata;
      this.getdataservice.ordercheckoutmodel.custno = customer.custno,
      this.getdataservice.ordercheckoutmodel.custname= customer.custname,
      this.getdataservice.ordercheckoutmodel.contact= customer.contact,
      this.getdataservice.ordercheckoutmodel.address= customer.address,
      this.getdataservice.ordercheckoutmodel.mobileno = customer.mobileno,
      this.getdataservice.ordercheckoutmodel.area=customer.area,
      this.getdataservice.ordercheckoutmodel.contactperson = customer.contactperson,
      this.getdataservice.ordercheckoutmodel.manualcustno=customer.manualcustno,
      this.getdataservice.ordercheckoutmodel.custtype=customer.custtype,
      this.getdataservice.ordercheckoutmodel.email=customer.email;
      this.getdataservice.ordercheckoutmodel.sldsaleorderdtls = this.getdataservice.cartdata.items;
      console.log(orderobj);
      this.dataService.createorder(orderobj).subscribe((res: any) => {
      console.log(res)
  
      })
    }
   
  }

}
