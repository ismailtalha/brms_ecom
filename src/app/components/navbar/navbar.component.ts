import { Component, OnInit,OnChanges, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { GetDataService } from 'src/app/services/getdata.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { EmitterService } from '../../services/emitter.service';
import { ToastrService } from 'ngx-toastr';


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
  companydata: any;
  imageurl: any;
  customer:any = [];
  productname;
  constructor(public domSanitizer: DomSanitizer,public eventemitter : EmitterService,public route:Router,public cartservice:GetDataService,
     location: Location,  private element: ElementRef, private router: Router, private cookies: CookieService,
      private dataService: DataService,private toast:ToastrService) {
    this.location = location;
    this.cartcount = this.cartservice.cartdata.count ;
   
  }
  getcompanyinfo()
  {
    this.dataService.getcompany().subscribe((res:any) => {
      
      
      this.companydata = res[0];
      this.cartservice.companydata = res;
      let TYPED_ARRAY = new Uint8Array(this.companydata.logo);
      const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
        return data + String.fromCharCode(byte);
        }, '');
     /// const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
      let base64String = btoa(STRING_CHAR);
      this.imageurl = 'data:image/jpeg;base64,' + btoa(this.companydata.logo);
     // this.imageurl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+base64String);
      this.cartservice.companydata = this.companydata;
      this.cartservice.companydata.logo = this.imageurl;
      console.log('companylogo',this.cartservice.companydata)
   }),(error) => {
    console.log(error);
  }
  }
  ngOnChanges(OnChanges)
  {
    
    this.getcartdata();
    
  }
  logout()
  {
    debugger
    let customer = JSON.parse(localStorage.getItem('customer')) ;
    let data = {"userno": customer.userno};
    this.dataService.logout(data).subscribe((data:any)=>{
      debugger
      if(data.errorstatusno == "1")
      {
      this.cookies.deleteAll();
      this.cartservice.customer.customerdata = [];
      localStorage.removeItem('customer');
      this.cartservice.customer.isLogin = false;
      localStorage.removeItem('isLogin');
      this.toast.success("Successfully Logout");
      }
      else
{
  this.toast.error(data.errortext);
  

}
    })
    
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
   
    if(this.cartservice.customer.customerdata.length == 0)
    {
      if(localStorage.getItem('customer'))
      {
        this.cartservice.customer.customerdata = localStorage.getItem('customer');
      }
      
    }
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getcartdata();
   // this.getcompanyinfo();
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
    debugger
    var index = this.cartservice.cartdata.items.findIndex(x => x.ID === item.ID && x.itemno == item.itemno);
   
    if(index >= 0)
    {
      
      this.cartservice.cartdata.count = this.cartservice.cartdata.count - this.cartservice.cartdata.items[index].quantity;
      this.cartservice.cartdata.total = this.cartservice.cartdata.total - this.cartservice.cartdata.items[index].amount;
      this.cartservice.cartdata.items.splice(index,1);
      localStorage.removeItem('cart-data');
      localStorage.setItem('cart-data',JSON.stringify(this.cartservice.cartdata) )
      this.cartservice.cartdata.total = 0;
      this.cartservice.cartdata.totaldiscount = 0;
      this.cartservice.cartdata.totalnetamount = 0;
      for (let index = 0; index < this.cartservice.cartdata.items.length; index++) {
        const element = this.cartservice.cartdata.items[index];
        this.cartservice.cartdata.total = (this.cartservice.cartdata.total + element.amount);
        this.cartservice.cartdata.totalnetamount = (this.cartservice.cartdata.totalnetamount + element.netamount);
        this.cartservice.cartdata.totaldiscount = this.cartservice.cartdata.totaldiscount + (element.amount-element.netamount);
      }
    }
    let unitindex = this.cartservice.units.units.findIndex(u => u.factorunit === item.factorunit && u.itemno == item.itemno);
    if(unitindex != -1)
    {
      this.cartservice.units.units.splice(unitindex,1)
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

    clearcart()
    {
      let index = this.cartservice.units.units=[];
      this.cartservice.cartdata.count = 0;
      this.cartservice.cartdata.total = 0;
      this.cartservice.cartdata.totaldiscount = 0;
      this.cartservice.cartdata.totalnetamount = 0;
      this.cartservice.cartdata.items = [];
      if(localStorage.getItem('cart-data'))
      {
        localStorage.removeItem('cart-data')
      }
    }
}
