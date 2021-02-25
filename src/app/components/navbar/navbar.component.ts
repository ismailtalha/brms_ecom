import { Component, OnInit,OnChanges, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { GetDataService } from 'src/app/services/getdata.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { EmitterService } from '../../services/emitter.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnChanges {
  public focus;
  public listTitles: any[];
  public cartitems: any[];
  public location: Location;
  date = new Date();
  userName = (localStorage.getItem('userName')) ? localStorage.getItem('userName').toUpperCase() : 'Admin';
  cartcount : number ;
  companydata: import("e:/Projects/ecom/front End/src/app/models/company.model").company;
  imageurl: any;
  customer:any = [];
  constructor(public domSanitizer: DomSanitizer,public eventemitter : EmitterService,public route:Router,public cartservice:GetDataService, location: Location,  private element: ElementRef, private router: Router, private cookies: CookieService, private dataService: DataService) {
    this.location = location;
    this.cartcount = this.cartservice.cartdata.count ;
    this.companydata = this.cartservice.companydata;
    console.log('data',this.companydata)
  }
 
  ngOnChanges(OnChanges)
  {
    
    this.getcartdata();
    
  }
  logout()
  {
    debugger
    this.cookies.deleteAll();
    this.cartservice.customer.customerdata = [];
    localStorage.removeItem('customer');
  // this.reload();
    
  }
  search(pname)
  {
    this.eventemitter.emit('searchproduct',pname)
  }
  reload()
  {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  ngOnInit() {
    debugger
    if(this.cartservice.customer.customerdata.length == 0)
    {
      if(localStorage.getItem('customer'))
      {
        this.cartservice.customer.customerdata = localStorage.getItem('customer');
      }
      
    }
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getcartdata();
  }

  getcartdata()
  {
    
    var count =  JSON.parse(localStorage.getItem('cart-data'));
    if(count)
    {
      this.cartservice.cartdata = JSON.parse(localStorage.getItem('cart-data')) 
    }
    else
    {
      this.cartservice.cartdata.count = 0;
      this.cartservice.cartdata.items = [];

    }
    // 
    // if(this.cartservice.cartdata.count == 0)
    // {
    //   this.cartservice.cartdata = JSON.parse(localStorage.getItem('cart-data')) 
    // }
   
  }
  remove(item)
  {
    
    var index = this.cartservice.cartdata.items.findIndex(x => x.ID === item.ID);
    if(index >= 0)
    {
      
      this.cartservice.cartdata.count = this.cartservice.cartdata.count - this.cartservice.cartdata.items[index].Qty;
      this.cartservice.cartdata.total = this.cartservice.cartdata.total - this.cartservice.cartdata.items[index].Total;
      this.cartservice.cartdata.items.splice(index,1);
      localStorage.removeItem('cart-data');
      localStorage.setItem('cart-data',JSON.stringify(this.cartservice.cartdata) )
    }
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }
  
    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  navigate()
    {
      console.log("object")
      
      this.route.navigate(["shop"])
    }


}
