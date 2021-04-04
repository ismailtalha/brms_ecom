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
    debugger
    if(localStorage.getItem("isLogin") != "true")
    {
       this.router.navigate(["/auth/login"])
    }
    this.checkout = this.fb.group({

      custname: [{value:null,disabled:true}, [Validators.required]],
      address: [null, [Validators.required]],
      address2: [null, null],
      email: [{value:null,disabled:true}, [Validators.email]],
      password: [{value:null,disabled:true}, [Validators.required]],
      userno: [{value:null,disabled:true}, [Validators.required]],
      phone: [{value:null,disabled:false}],
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
    this.getdataservice.customer.isLogin = true;
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
        
        this.displaybox.successtwobuttons(res.docno).then((result)=>{
          console.log('aqwasdasdas',result)
          if(result.isConfirmed)
          {
             this.generatepdf(res.docno);
          }
          if(result.isDenied)
          {
            this.PrintPartOfPage("cartbill")
          }
          this.router.navigate(["shop"]);
          this.reset();

        })
      })
    }

  }
   PrintPartOfPage(dvprintid)
  {
    debugger
       var html = '<h1 style="color:blue">hello</h1><div id="printhtml"></div>'
       var prtContent = document.getElementById(dvprintid);
       
      //  console.log('prtContent',prtContent)
      //  var printhtml = prtContent.append(html);
      //  var WinPrint = window.open('', '', 'letf=100,top=100,width=600,height=600');
      //  WinPrint.document.write(printhtml);
      //  WinPrint.document.close();
      //  WinPrint.focus();
      //  WinPrint.print();
      fetch('../../../../test.html').then(function (response) {
        // The API call was successful!
        return response.text();
      }).then(function (html) {
      
        // Convert the HTML string into a document object
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
      
        console.log('file',doc);
      
      }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
      });
     
       var mywindow = window.open('', '', 'letf=100,top=100,width=600,height=600');
       mywindow.document.write('<html><head><title></title>');
       mywindow.document.write('<link rel="stylesheet" href="css/midday_receipt.css" type="text/css" />');
       mywindow.document.write('</head><body >');
       mywindow.document.write(`
       <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
       <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
       <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
       <style>
       .invoice-title h2, .invoice-title h3 {
        display: inline-block;
    }
    
    .table > tbody > tr > .no-line {
        border-top: none;
    }
    
    .table > thead > tr > .no-line {
        border-bottom: none;
    }
    
    .table > tbody > tr > .thick-line {
        border-top: 2px solid;
    }</style>
       <!------ Include the above in your HEAD tag ---------->
       
       <div class="container">
           <div class="row">
               <div class="col-xs-12">
               <div class="invoice-title">
                 <h2>Invoice</h2><h3 class="pull-right">Order # 12345</h3>
               </div>
               <hr>
               <div class="row">
                 <div class="col-xs-6">
                   <address>
                   <strong>Billed To:</strong><br>
                     John Smith<br>
                     1234 Main<br>
                     Apt. 4B<br>
                     Springfield, ST 54321
                   </address>
                 </div>
                 <div class="col-xs-6 text-right">
                   <address>
                     <strong>Shipped To:</strong><br>
                     Jane Smith<br>
                     1234 Main<br>
                     Apt. 4B<br>
                     Springfield, ST 54321
                   </address>
                 </div>
               </div>
               <div class="row">
                 <div class="col-xs-6">
                   <address>
                     <strong>Payment Method:</strong><br>
                     Visa ending **** 4242<br>
                     jsmith@email.com
                   </address>
                 </div>
                 <div class="col-xs-6 text-right">
                   <address>
                     <strong>Order Date:</strong><br>
                     March 7, 2014<br><br>
                   </address>
                 </div>
               </div>
             </div>
           </div>
           
           <div class="row">
             <div class="col-md-12">
               <div class="panel panel-default">
                 <div class="panel-heading">
                   <h3 class="panel-title"><strong>Order summary</strong></h3>
                 </div>
                 <div class="panel-body">
                   <div class="table-responsive">
                     <table class="table table-condensed">
                       <thead>
                                       <tr>
                             <td><strong>Item</strong></td>
                             <td class="text-center"><strong>Price</strong></td>
                             <td class="text-center"><strong>Quantity</strong></td>
                             <td class="text-right"><strong>Totals</strong></td>
                                       </tr>
                       </thead>
                       <tbody>
                         <!-- foreach ($order->lineItems as $line) or some such thing here -->
                         <tr>
                           <td>BS-200</td>
                           <td class="text-center">$10.99</td>
                           <td class="text-center">1</td>
                           <td class="text-right">$10.99</td>
                         </tr>
                                       <tr>
                             <td>BS-400</td>
                           <td class="text-center">$20.00</td>
                           <td class="text-center">3</td>
                           <td class="text-right">$60.00</td>
                         </tr>
                                       <tr>
                               <td>BS-1000</td>
                           <td class="text-center">$600.00</td>
                           <td class="text-center">1</td>
                           <td class="text-right">$600.00</td>
                         </tr>
                         <tr>
                           <td class="thick-line"></td>
                           <td class="thick-line"></td>
                           <td class="thick-line text-center"><strong>Subtotal</strong></td>
                           <td class="thick-line text-right">$670.99</td>
                         </tr>
                         <tr>
                           <td class="no-line"></td>
                           <td class="no-line"></td>
                           <td class="no-line text-center"><strong>Shipping</strong></td>
                           <td class="no-line text-right">$15</td>
                         </tr>
                         <tr>
                           <td class="no-line"></td>
                           <td class="no-line"></td>
                           <td class="no-line text-center"><strong>Total</strong></td>
                           <td class="no-line text-right">$685.99</td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             </div>
           </div>
       </div>
       `);
       mywindow.document.write('</body></html>');
       mywindow.document.close();
       mywindow.focus();
       mywindow.print();  
       console.log(mywindow)
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
   getText(divID) {
    var w = window.open("test.html");
    w.addEventListener("load", function() {
        var body = w.document.body;
        var div = document.getElementById(divID);
        var textContent = body.textContent || body.innerText;
        console.log(textContent);
    });
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
