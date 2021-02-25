import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetDataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') form;
  email: any;
  password: any;
  rememberMe: boolean = false;
  constructor(private router: Router, private cookies: CookieService,public getdataservice : GetDataService,
     private dataService: DataService,
     private loader: NgxUiLoaderService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  loginform = new FormGroup({

    userno : new FormControl(null,Validators.required),
    password : new FormControl(null,Validators.required)
  })

  userlogin()
  {
    console.log(this.loginform.value)
    //get single user by userno
   let user = this.getsingleuser(this.loginform.value.userno);
   if(user.password == this.loginform.value.password)
   {
    this.getdataservice.user = user;
    this.toastr.success("Login Successfully")
   }
   else
   {
    this.toastr.error("Username or password is incorrect")
   }

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
