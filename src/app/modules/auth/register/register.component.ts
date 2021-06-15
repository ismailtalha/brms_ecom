import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { getDefaultLibFileName } from 'typescript';
import { GetDataService } from '../../../services/getdata.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dataService: DataService, private getdataservice: GetDataService, public router: Router, private toastr: ToastrService, private loader: NgxUiLoaderService,private fb:FormBuilder) { }
 customer:FormGroup
  edit: any;
  submitted=false;
  ngOnInit(): void {
    this.customer = this.fb.group({
      custname: [null],
      custlastname:[null],
       phone:[null],
       email:[null, [Validators.email]],
       password:[null,[Validators.required]],
       userno:[null,[Validators.required]],
       ntnno:[null],
       billingaddress:[null],
       address:[null],
       companyname:[null],
       contact:[null]

    });
  }
  reload() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  // create() {
    
  //   if (this.customer.valid) {
  //     let userobj = {
  //       username: this.customer.value.fname + this.customer.value.lname,
  //       password: this.customer.value.password,
  //       usertype: "normal",
  //     }
  //     this.loader.start();
  //     this.dataService.createUser(userobj).subscribe((userdata: any) => {
  //       this.getdataservice.user.userdata  = userdata;
  //       let customerobj = this.customer.value;
  //       customerobj.custname =  this.customer.value.fname + this.customer.value.lname;
  //       customerobj.contact =  this.customer.value.phone;
  //       customerobj.userno = userdata.docno;
  //       this.dataService.createCustomer(customerobj).subscribe((customer: any) => {
  //         this.getdataservice.customer.customerdata = customer;
  //         localStorage.setItem('customer', customer);
  //         this.loader.stop();
  //         this.toastr.success("Register Successfully")


  //       }, (error) => {
  //         console.log(error);
  //         this.toastr.show(error, "Error Messege");
  //         this.toastr.error("error", "Database Connectivity")
  //         this.loader.stop();
  //       })
  //     }, (error) => {
  //       console.log(error);
  //       this.toastr.show(error, "Error Messege");
  //       this.toastr.error("error", "Database Connectivity")
  //       this.loader.stop();
  //     })
  //   }
  // }
  get register() { return this.customer.controls; }
  create() {
    
    this.submitted = true;
    if (this.customer.valid) {
    
      this.loader.start();
      let customerobj = this.customer.value;
          // customerobj.custname =  this.customer.value.fname + this.customer.value.lname;
          // customerobj.contact =  this.customer.value.phone;
          // customerobj.password  = this.customer.value.password;
          this.dataService.createCustomer(customerobj).subscribe((customer: any) => {
            this.getdataservice.customer.customerdata = JSON.stringify(customer) ;
            localStorage.setItem('customer', JSON.stringify(customer));
            this.loader.stop();
            this.router.navigate(['shop']);
            localStorage.setItem('isLogin',"true");
            this.toastr.success("Register Successfully")
  
  
          }, (error) => {
            console.log(error);
            this.toastr.show(error, "Error Messege");
            this.toastr.error("error", "Database Connectivity")
            this.loader.stop();
          })
      // this.dataService.getsinglecustomer(this.customer.value.userno).subscribe((custinfo: any) => {
      //   if(custinfo.userno == null)
      //   {
      //     let customerobj = this.customer.value;
      //     customerobj.custname =  this.customer.value.fname + this.customer.value.lname;
      //     customerobj.contact =  this.customer.value.phone;
      //     customerobj.password  = this.customer.value.password;
      //     this.dataService.createCustomer(customerobj).subscribe((customer: any) => {
      //       this.getdataservice.customer.customerdata = JSON.stringify(customer) ;
      //       localStorage.setItem('customer', customer);
      //       this.loader.stop();
      //       this.router.navigate(['shop']);
      //       localStorage.setItem('isLogin',"true");
      //       this.toastr.success("Register Successfully")
  
  
      //     }, (error) => {
      //       console.log(error);
      //       this.toastr.show(error, "Error Messege");
      //       this.toastr.error("error", "Database Connectivity")
      //       this.loader.stop();
      //     })
      //   }
      //   else
      //   {
      //     this.toastr.error("error", "Customer ALready Exist")
      //     this.loader.stop();
      //   }
      //   }
      //   , (error) => {
      //     console.log(error);
      //     this.toastr.show(error, "Error Messege");
      //     this.toastr.error("error", "Database Connectivity")
      //     this.loader.stop();
      //   })





    }
  }
}
