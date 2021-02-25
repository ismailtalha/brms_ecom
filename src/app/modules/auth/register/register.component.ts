import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private dataService: DataService, private getdataservice: GetDataService, public router: Router, private toastr: ToastrService, private loader: NgxUiLoaderService) { }
  customer = new FormGroup({
    fname: new FormControl(null, Validators.required),
    lname: new FormControl(null, Validators.required),
    phone: new FormControl(null),
    email: new FormControl(null, [Validators.email]),
    password: new FormControl(null, Validators.required),
  });
  edit: any;
  ngOnInit(): void {
  }
  reload() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  create() {
    debugger
    if (this.customer.valid) {
      let userobj = {
        username: this.customer.value.fname + this.customer.value.lname,
        password: this.customer.value.password,
        usertype: "normal",
        userno: "admin",
      }
      this.loader.start();
      this.dataService.createUser(userobj).subscribe((userdata: any) => {
        this.getdataservice.user.userdata  = userdata;
        let customerobj = this.customer.value;
        customerobj.custname =  this.customer.value.fname + this.customer.value.lname;
        customerobj.contact =  this.customer.value.phone;
        customerobj.userno = userdata.docno;
        this.dataService.createCustomer(customerobj).subscribe((customer: any) => {
          this.getdataservice.customer.customerdata = customer;
          localStorage.setItem('customer', customer);
          this.loader.stop();
          this.toastr.success("Register Successfully")


        }, (error) => {
          console.log(error);
          this.toastr.show(error, "Error Messege");
          this.toastr.error("error", "Database Connectivity")
          this.loader.stop();
        })
      }, (error) => {
        console.log(error);
        this.toastr.show(error, "Error Messege");
        this.toastr.error("error", "Database Connectivity")
        this.loader.stop();
      })





    }
  }
}
