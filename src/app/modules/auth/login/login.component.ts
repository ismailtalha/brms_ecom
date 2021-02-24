import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private router: Router, private cookies: CookieService,
     private dataService: DataService,
     private loader: NgxUiLoaderService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
  }

}
