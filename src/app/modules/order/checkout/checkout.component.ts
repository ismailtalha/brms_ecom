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
    private toastr: ToastrService, private fb: FormBuilder) { }
  checkout: FormGroup;
  loginform: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.checkout = this.fb.group({

      custname: [null, [Validators.required]],
      address: [null, [Validators.required]],
      address2: [null, null],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      userno: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    })

    let localStorageCustomer = localStorage.getItem('customer');
    if (this.getdataservice.customer.customerdata || localStorageCustomer) {
      let cust = this.getdataservice.customer.customerdata == undefined ? localStorageCustomer : this.getdataservice.customer.customerdata;
      this.checkout.patchValue({
        custname: cust.custname,
        address: cust.address,
        address2: "",
        email: cust.email,
        password: cust.password,
        userno: cust.userno,
        phone: cust.phone




      })
    }
  }
  get order() { return this.checkout.controls; }

  ordercheckout() {


    this.submitted = true;
    this.loader.start();
    if (this.checkout.valid) {
      let orderobj = this.getdataservice.ordercheckoutmodel;

      let customer = this.checkout.value;
      this.getdataservice.ordercheckoutmodel.custno = this.getdataservice.customer.customerdata.custno,
        this.getdataservice.ordercheckoutmodel.custname = customer.custname,
        this.getdataservice.ordercheckoutmodel.contact = customer.contact,
        this.getdataservice.ordercheckoutmodel.address = customer.address,
        this.getdataservice.ordercheckoutmodel.mobileno = customer.phone,
        this.getdataservice.ordercheckoutmodel.area = customer.area,
        this.getdataservice.ordercheckoutmodel.contactperson = customer.custno,
        this.getdataservice.ordercheckoutmodel.manualcustno = "",
        this.getdataservice.ordercheckoutmodel.custtype = customer.custtype,
        this.getdataservice.ordercheckoutmodel.email = customer.email;
      this.getdataservice.ordercheckoutmodel.sldsaleorderdtls = this.getdataservice.cartdata.items;
      console.log(orderobj);
      this.dataService.createorder(orderobj).subscribe((res: any) => {
        this.loader.stop();
        this.router.navigate(["shop"]);
        this.toastr.success('Order Sccessfully Done')
        this.reset();

      })
    }

  }

  reset() {
    this.getdataservice.cartdata.items = [];
    this.getdataservice.cartdata.count = 0;
    this.getdataservice.cartdata.total = 0;
    localStorage.removeItem('items')
    localStorage.removeItem('count')
    localStorage.removeItem('total')
    localStorage.removeItem('cart-data')
    this.checkout.reset();
  }
}
