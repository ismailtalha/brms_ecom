import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ordercheckoutmodel } from 'src/app/models/order.models';
import { DataService } from 'src/app/services/data.service';
import { GetDataService } from 'src/app/services/getdata.service';
import { MustMatch } from '../../../services/mustmatch';
import {SweetalertService} from '../../../Utilities/sweetalert.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router, private cookies: CookieService,public displaybox:SweetalertService, public getdataservice: GetDataService,
    private dataService: DataService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService, private fb: FormBuilder , ) { }

    @ViewChild('cartbill', {static: false}) cartbill: ElementRef;
  checkout: FormGroup;
  loginform: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.checkout = this.fb.group({

      custname: [null, [Validators.required]],
      address: [null, [Validators.required]],
      address2: [null, null],
      email: [null, [Validators.email,Validators.required]],
      password: [null, [Validators.required]],
      userno: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    })

    let localStorageCustomer = localStorage.getItem('customer');
    debugger
    if (this.getdataservice.customer.customerdata || localStorageCustomer) {
      let cust = this.getdataservice.customer.customerdata == undefined ? JSON.parse(localStorageCustomer)  : JSON.parse(this.getdataservice.customer.customerdata);
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

debugger
    this.submitted = true;
    
    if (this.checkout.valid) {
      this.loader.start();
      let orderobj = this.getdataservice.ordercheckoutmodel;

      let customer = this.checkout.value;
      let serviceobj = JSON.parse(this.getdataservice.customer.customerdata) ;
      this.getdataservice.ordercheckoutmodel.custno = serviceobj.custno;
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
      orderobj.deliverylocation = customer.address + customer.address2;
      orderobj.userno = serviceobj.userno;
      console.log(orderobj);
      this.dataService.createorder(orderobj).subscribe((res: any) => {
        console.log('result',res)
       
        this.loader.stop();
        this.router.navigate(["shop"]);
        this.reset();
        this.displaybox.successtwobuttons(res.docno).then((result)=>{
          if(result.isConfirmed)
          {
            this.generatepdf(res.docno);
          }


        })
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
  
  generatepdf(orderno)
  {
    const doc = new jsPDF();
    const pdfTable = this.cartbill.nativeElement;
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save("Order-"+orderno+'.pdf');

  }
}
