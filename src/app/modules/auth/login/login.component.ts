import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GetDataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  submitted=false;
  loginform:FormGroup;
  constructor(private router: Router, private cookies: CookieService,public getdataservice : GetDataService,
     private dataService: DataService,
     private loader: NgxUiLoaderService,
     private toastr: ToastrService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({

      userno : ['',Validators.required],
      password : ['',Validators.required]
    })
  }


 
  get l() { return this.loginform.controls; }
   loginuser()
  {
    this.submitted = true;
    console.log(this.loginform.value)
    if(this.loginform.valid)
    {
      this.loader.start();
      this.dataService.getsinglecustomer(this.loginform.value.userno).subscribe((cust:any)=>{
        console.log(cust)
       this.loader.stop();
       if(cust.userno != null)
       {
         
        if(cust.password == this.loginform.value.password)
        {
          
          this.getdataservice.customer.customerdata = JSON.stringify(cust);
          localStorage.setItem('customer',JSON.stringify(cust))
          localStorage.setItem('isLogin',"true");
          this.getdataservice.customer.isLogin ?  this.router.navigate(["checkout"]) : this.router.navigate(["shop"]);
         
          this.toastr.success("Login Successfully")
        }
        else{
          this.toastr.error("Password is incorrect")
        }
       
       }
       else
       {
        this.toastr.error("Username is incorrect")
       }
    
      }, (error) => {
        this.loader.stop();
       console.log(error);
       
     })
    }
    //get single user by userno
   
   
  }
  
 
  getsingleuser(userno)
  {
    let userobj;
    this.loader.start();
     this.dataService.getsingleuser(userno).subscribe((user)=>{
      this.loader.stop();
         userobj = user;
     }, (error) => {
       this.loader.stop();
      console.log(error);
      userobj = error;
      
    })
    return userobj;
  }


}
