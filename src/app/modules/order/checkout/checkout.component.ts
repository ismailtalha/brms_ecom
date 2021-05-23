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
import { SweetalertService } from '../../../Utilities/sweetalert.service';
import { htmlToPdfmake } from "html-to-pdfmake"
import { PrintService } from 'src/app/Utilities/print.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [DatePipe]
})
export class CheckoutComponent implements OnInit {
  enableprint: boolean = false;
  companydata;
  constructor(private router: Router, private cookies: CookieService, public displaybox: SweetalertService, public getdataservice: GetDataService,
    private dataService: DataService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService, private fb: FormBuilder, private print: PrintService, private datePipe: DatePipe) { }

  @ViewChild('cartbill', { static: false }) cartbill: ElementRef;
  checkout: FormGroup;
  loginform: FormGroup;
  submitted = false;
  orderresponse: any;
  getcurrentdate() {
    let currdate: any = new Date();
    currdate = this.datePipe.transform(currdate, 'yyyy-MM-dd');
    return currdate;
  }
  ngOnInit(): void {

    this.companydata = this.getdataservice.companydata.logo;
    if (localStorage.getItem("isLogin") != "true") {
      this.router.navigate(["/auth/login"])
    }
    this.checkout = this.fb.group({

      custname: [{ value: null, disabled: true }, [Validators.required]],
      address: [null, [Validators.required]],
      address2: [null, null],
      email: [{ value: null, disabled: true }, [Validators.email]],
      password: [{ value: null, disabled: true }, [Validators.required]],
      userno: [{ value: null, disabled: true }, [Validators.required]],
      phone: [{ value: null, disabled: false }],
      authenticationtoken: [null]
    })

    let localStorageCustomer = localStorage.getItem('customer');

    if (this.getdataservice.customer.customerdata || localStorageCustomer) {
      let cust = this.getdataservice.customer.customerdata == undefined ? JSON.parse(localStorageCustomer) : JSON.parse(this.getdataservice.customer.customerdata);
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
    this.getdataservice.customer.isLogin = true;
    if (this.checkout.valid) {

      this.loader.start();
      let orderobj = this.getdataservice.ordercheckoutmodel;

      let customer = this.checkout.value;
      let serviceobj = JSON.parse(this.getdataservice.customer.customerdata);
      let companyobj = this.getdataservice.companydata;
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
      this.getdataservice.ordercheckoutmodel.docdate = this.getcurrentdate();
      this.getdataservice.ordercheckoutmodel.currency = companyobj[0].currency;
      this.getdataservice.ordercheckoutmodel.companyname = companyobj[0].companyname;
      this.getdataservice.ordercheckoutmodel.totalamount = this.getdataservice.cartdata.total;
      this.getdataservice.ordercheckoutmodel.sldsaleorderdtls = this.getdataservice.cartdata.items;
      orderobj.deliverylocation = customer.address + customer.address2;
      orderobj.userno = serviceobj.userno;
      orderobj.authenticationtoken = localStorage.getItem('authtoken')
      // orderobj.authenticationtoken = "ismailadminlogtime:5/23/20215:12:39AM";
      console.log(orderobj);
      this.dataService.createorder(orderobj).subscribe((res: any) => {
        console.log('result', res)

        this.loader.stop();


        this.displaybox.successtwobuttons(res.docno, this.getdataservice.companydata[0].companyname).then((result) => {
          console.log('aqwasdasdas', result)
          // if (result.isConfirmed) {
          //   this.orderresponse = res.docno;
          //   this.generatepdf(this.orderresponse)
          // }
          if (result.isConfirmed) {
            this.orderresponse = res;
            this.print.directprint(this.orderresponse, this.getdataservice.companydata[0], 'cartbill', 'getlogo')
          }
          this.router.navigate(["shop"]);
          this.reset();

        })
      })
    }

  }
  //   creatpdfhtmltoprint(order,company,html)
  //   {
  //     var html = '<h1 style="color:blue">hello</h1><div id="printhtml"></div>'
  //     var prtContent = document.getElementById('cartbill');
  //     let logo = document.getElementById('getlogo');
  //     var img = document.createElement("img");
  //     img.src = logo["src"];
  //     let logoimg = img; 
  //     let mywindow = window.open('', '', 'left=100,top=100,width=2000,height=600');
  //     mywindow.document.write('<html><head><title></title>');
  //    mywindow.document.write('</head><body >');
  //     mywindow.document.write(`
  //     <style>


  //   PrintPartOfPage() {

  //     this.enableprint = true

  //     var html = '<h1 style="color:blue">hello</h1><div id="printhtml"></div>'
  //     var prtContent = document.getElementById('cartbill');
  //     let logo = document.getElementById('getlogo');
  //     var img = document.createElement("img");
  //     img.src = logo["src"];
  //     let logoimg = img; 
  //     var mywindow = window.open('', '', 'letf=100,top=100,width=2000,height=600');
  //     mywindow.document.write('<html><head><title></title>');
  //    mywindow.document.write('</head><body >');
  //     mywindow.document.write(`
  //     <style>

  // /*# sourceMappingURL=bootstrap.min.css.map */
  // </style>
  //        <div class="container mt-1">
  //        <div class="d-flex justify-content-center row">
  //            <div class="col-md-12">
  //                <div class="p-3 bg-white rounded">
  //                    <div class="row">
  //                        <div class="col-md-6">
  //                        <img src=${logoimg.currentSrc} style="width:75px !important ; height:50px !importnt">
  //                            <div class="billed"><span class="info-labels">Customer:</span><span class="ml-1">${this.orderresponse.custname}</span></div>
  //                            <div class="billed"><span class="info-labels">Location:</span><span class="ml-1">${this.orderresponse.deliverylocation}</span></div>
  //                            <div class="billed"><span class="info-labels">Cust Type:</span><span class="ml-1">${this.orderresponse.custtype}</span></div>
  //                            <div class="billed"><span class="info-labels">Description:</span><span class="ml-1">${this.orderresponse.description}</span></div>
  //                            </div>
  //                        <div class="col-md-6 text-right mt-3">
  //                            <h4 class="text-primary font-weight-bold mb-0">${this.getdataservice.companydata[0].companyname}</h4>

  //                            <div class="billed"><span class="info-labels">Order no:</span><span class="ml-1">${this.orderresponse.docno}</span></div>
  //                            <div class="billed"><span class="info-labels">Order Date:</span><span class="ml-1">${this.orderresponse.docdate}</span></div>
  //                            <div class="billed"><span class="info-labels">Term:</span><span class="ml-1">${this.orderresponse.paymentterm}</span></div>
  //                        </div>
  //                    </div>
  //                    <div class="mt-3">
  //                        <div class="table-responsive">
  //                            <table class="table">
  //                                <thead>
  //                                    <tr>
  //                                        <th>Product</th>
  //                                        <th>UnitName</th>
  //                                        <th>Unit</th>
  //                                        <th>Price</th>
  //                                        <th>Total</th>
  //                                    </tr>
  //                                </thead>
  //                                ${prtContent.innerHTML}
  //                            </table>
  //                        </div>
  //                    </div>

  //                </div>
  //            </div>
  //        </div>
  //    </div>

  //        `);
  //     mywindow.document.write('</body></html>');
  //     console.log('mywindow' , mywindow)
  //     mywindow.document.close();
  //     mywindow.focus();
  //     mywindow.print();
  //     console.log(mywindow)
  //   }
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
  // getText(divID) {
  //   var w = window.open("test.html");
  //   w.addEventListener("load", function () {
  //     var body = w.document.body;
  //     var div = document.getElementById(divID);
  //     var textContent = body.textContent || body.innerText;
  //     console.log(textContent);
  //   });
  // }
  generatepdf(orderno) {

    const doc = new jsPDF();
    // const pdfTable = this.creatpdfhtml();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    // doc.fromHTML(pdfTable.document.documentElement.innerHTML, 15, 15, {
    //   width: 190,
    //   'elementHandlers': specialElementHandlers
    // });

    doc.save("Order-" + orderno + '.pdf');
    // var val = htmlToPdfmake(pdfTable);
    // var dd = {content:val};
    //  htmlToPdfmake.pdfMake.createPdf(dd).download();
  }
}
