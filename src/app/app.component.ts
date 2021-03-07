import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from './services/data.service';
import { GetDataService } from './services/getdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'argon-dashboard-angular';
  companydata: any;
  imageurl: any;

 constructor(public domSanitizer: DomSanitizer,public cartservice:GetDataService,private dataService: DataService)
 {
  
 }
  ngOnInit(): void {
    this.getcompanyinfo();
  }
 

 async getcompanyinfo()
  {
  await  this.dataService.getcompany().subscribe((res:any) => {
      
      this.companydata = res;
      this.cartservice.companydata = res;
      // let TYPED_ARRAY = new Uint8Array(this.companydata[0].logo);
      // const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
      //   return data + String.fromCharCode(byte);
      //   }, '');
     /// const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
      //let base64String = btoa(STRING_CHAR);
      this.imageurl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+this.companydata[0].logo);
      this.cartservice.companydata = this.companydata;
      this.cartservice.companydata.logo = this.imageurl;
      console.log(this.cartservice.companydata)
   }),(error) => {
    console.log(error);
  }
  }
}
