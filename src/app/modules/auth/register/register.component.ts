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
  createcustomer() {
    if (this.customer.valid) {
      this.loader.start();
      this.dataService.createCustomer(this.customer.value).subscribe((res: any) => {
        console.log(res);
        this.getdataservice.customer.customer = res;
        localStorage.setItem('customer', res);
        this.loader.stop();

      }, (error) => {
        console.log(error);
        this.toastr.show(error, "Error Messege");
        this.toastr.error("error", "Database Connectivity")
        this.loader.stop();
      })


    }
  }
}
