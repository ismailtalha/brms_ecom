import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { forkJoin, Observable } from 'rxjs';
import { itemgroup } from 'src/app/models/itemgroup';
import { DataService } from 'src/app/services/data.service';
import { EmitterService } from 'src/app/services/emitter.service';
import { GetDataService } from 'src/app/services/getdata.service';
import {OwlCarousel} from 'ngx-owl-carousel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-baseshop',
  templateUrl: './baseshop.component.html',
  styleUrls: ['./baseshop.component.css']
})
export class BaseshopComponent implements OnInit {
  @Input() pagetype: string;
  imageurl: any;
  companydata: any;
  categories: any = [];
  itemgroups: any = [];
  resbrands: any = [];
  filterarray: any = [];
  category: any = [];
  brands: any = [];
  itemsPerPage: any = 6;
  isCollapsed=false;
  catsearch;
  groupsearch;
  brandsearch;
  p;
  totalitemscount = 0;
  sortby = "saleprice";
  sortup = false;
  sortdown = true;
  units = [];
  selectedunits = [];
  images=['src/assets/ItemImages/Devices/3.jpg','src/assets/ItemImages/Devices/4.jpg'];
  checkunit : boolean = false;
 
  constructor(private dataService: DataService,
    public eventemitter: EmitterService,
     public cartservice: GetDataService,
      private toastr: ToastrService,
       private loader: NgxUiLoaderService,
       private modalService: NgbModal) { }

       items: any = [];
       ngOnInit(): void {
         console.log('hello shop')
         this.getmultiplerequests();
         this.eventemitter.listen('searchproduct', data => {
           this.filter(data, 'productsearch')
         })
         
       } 
    
       perpageitems(num) {
         this.itemsPerPage = num;
       }
      public getfiltereditems()
      {
        
        if(this.pagetype == "isfeatured")
        {
          return this.items.filter(i => i.isfeatured == true && i.isnewarrival == false) 
        }
        else if(this.pagetype == "isnewarrival")
        {
          return  this.items.filter(i => i.isnewarrival == true && i.isfeatured == false)
        }
        return this.items;
      }
       public getmultiplerequests() {
         this.loader.start();
         let items = this.dataService.getProducts();
         let category = this.dataService.getcategory();
         let itemgroups = this.dataService.getitemgroup();
         let brands = this.dataService.getbrands();
         forkJoin([items, category, itemgroups, brands]).subscribe(([itemres, catres, itemgroupres, resbrands]) => {
           
           this.items = itemres;
           console.log('returned items',this.getfiltereditems())
           this.items = this.getfiltereditems();
           this.cartservice.allitems.items = this.items;
           this.totalitemscount = this.items.length;
           this.categories = catres;
           this.getitemscount(this.categories,'productno');
           this.cartservice.category.items = this.categories;
           this.itemgroups = itemgroupres;
           this.getitemscount(this.itemgroups,'itemgroupno');
           this.cartservice.itemgroup.items = this.itemgroups;
           this.resbrands = resbrands
           this.getitemscount(this.resbrands,'makeno');
           this.cartservice.brands.items = this.resbrands;
           console.log('items', this.items, 'categories', this.categories, 'groups', this.itemgroups);
           this.applysort('up');
           this.loader.stop();
         }), (error) => {
           console.log(error);
           this.toastr.show(error, "Error Messege");
           this.toastr.error("error", "Database Connectivity")
           this.loader.stop();
         }
     
       }
       getitemscount(array,key)
       {
         array.forEach(element => {
           let result = this.items.filter(o2 => o2[key] == element[key]);
           element.itemcount = result.length ;
         });
       }
       
       addtocart(data) {
         debugger
         let items = [];
         var index = this.cartservice.cartdata.items.findIndex(x => x.ID === data.rowno && x.itemno == data.itemno);
         var qty = data.quantity ? data.quantity : 1;
         var price = data.saleprice;
         var amount = qty*price;
         var discountamount = (data.discount/100)*amount;
         var netamount = amount - discountamount;

         let obj = {
           ID: data.rowno,
           itemname: data.itemname,
           itemno:data.itemno,
           price: data.saleprice,
           factorunitname:data.factorunitname,
           factorunit:data.factorunit,
           factorno:data.factorunit,
           baseunitno:data.baseunitno,
           discount:data.discount,
           quantity:qty,
           amount:amount,
           //quantity: data.quantity ? data.quantity : 1,
           //amount:data.quantity ? data.saleprice * data.quantity :data.saleprice * 1,
           netamount: netamount,
         }
         if (index < 0) {
           this.cartservice.cartdata.items.push(obj)
           this.cartservice.cartdata.count = data.quantity ? (this.cartservice.cartdata.count + data.quantity) : (this.cartservice.cartdata.count + 1);
         }
        //  else {
        //    this.cartservice.cartdata.items[index].amount = 0;
        //    this.cartservice.cartdata.items[index].quantity = data.quantity ? this.cartservice.cartdata.count + data.quantity : this.cartservice.cartdata.count + 1;
     
        //    this.cartservice.cartdata.items[index].amount = this.cartservice.cartdata.items[index].quantity * this.cartservice.cartdata.items[index].price;
        //    this.cartservice.cartdata.count = data.quantity ? (this.cartservice.cartdata.count + data.quantity) : (this.cartservice.cartdata.count + 1);
        //   }
         // this.cartservice.cartdata.count = this.cartservice.cartdata.count + 1;
         // this.cartservice.cartdata.items = items;
         this.cartservice.cartdata.total = 0;
         this.cartservice.cartdata.totaldiscount = 0;
         this.cartservice.cartdata.totalnetamount = 0;
         for (let index = 0; index < this.cartservice.cartdata.items.length; index++) {
           const element = this.cartservice.cartdata.items[index];
           this.cartservice.cartdata.total = (this.cartservice.cartdata.total + element.amount);
           this.cartservice.cartdata.totalnetamount = (this.cartservice.cartdata.totalnetamount + element.netamount);
           this.cartservice.cartdata.totaldiscount = this.cartservice.cartdata.totaldiscount + (element.amount-element.netamount);
         }
         localStorage.setItem('cart-data', JSON.stringify(this.cartservice.cartdata))
       }
       addOrReplace(object) {
     
       }
     
       filter(data, filtertype) {
         
         let index = this.filterarray.findIndex(x => x.type === filtertype);
     
         if (index > -1) {
           let ind = this.filterarray[index].data.findIndex(x => x === data);
           if (ind > -1) {
     
             this.filterarray[index].data.splice(ind, 1);
             if (this.filterarray[index].data.length == 0) {
               this.filterarray.splice(index, 1);
             }
           }
           else {
             this.filterarray[index].data.push(data);
           }
     
         }
         else {
           this.filterarray.push({ 'type': filtertype, data: [data] })
         }
     
         if (this.filterarray)
     
           this.items = this.applyfilters(this.filterarray);
     
         if (filtertype == "productsearch") {
           let query = data.toLowerCase();
           let items = this.cartservice.allitems.items;
           this.items = items.filter(item => item.itemname.toLowerCase().indexOf(query) >= 0);
     
     
         }
     
       }
     
       applyfilters(array) {
         if (array.length == 0) {
           return this.cartservice.allitems.items
         }
         let items = this.cartservice.allitems.items;
         let tempitems = [];
         let filtereditems = [];
         array.forEach(element => {
           if (element.type == "category") {
             let catarr = element.data;
             for (let i = 0; i <= catarr.length; i++) {
               console.log(catarr[i]);
     
               items.forEach(itm => {
                 if (itm.productno != null) {
                   if (itm.productno == catarr[i]) {
                     tempitems.push(itm);
                   }
                 }
               })
               //itm.productno != null ? itm.productno == catarr[i] : itm);
             }
             filtereditems = tempitems;
           }
           else if (element.type == "itemgroup") {
             let catarr = element.data;
             for (let i = 0; i <= catarr.length; i++) {
               console.log(catarr[i]);
     
               items.forEach(itm => {
                 if (itm.itemgroupno != null) {
                   if (itm.itemgroupno == catarr[i]) {
                     tempitems.push(itm);
                   }
                 }
               })
               //itm.productno != null ? itm.productno == catarr[i] : itm);
             }
             filtereditems = tempitems;
           }
           else if (element.type == "brand") {
             let catarr = element.data;
             for (let i = 0; i <= catarr.length; i++) {
               console.log(catarr[i]);
     
               items.forEach(itm => {
                 if (itm.makeno != null) {
                   if (itm.makeno == catarr[i]) {
                     tempitems.push(itm);
                   }
                 }
               })
               //itm.productno != null ? itm.productno == catarr[i] : itm);
             }
             filtereditems = tempitems;
           }
         });
     
         return filtereditems;
       }
     
       ///// Search Filter for category brands groups
     
       searchfilter(type,text)
       {
         
         if(type=="category")
         {
           let categories = this.cartservice.category.items ;
           let query = text.toLowerCase();
           this.categories = categories.filter(item => item.productname.toLowerCase().indexOf(query) >= 0);
           return;
     
         }
         else if (type=="brand")
         {
           let brands = this.cartservice.brands.items ;
           let query = text.toLowerCase();
           this.resbrands = brands.filter(item => item.makename.toLowerCase().indexOf(query) >= 0);
           return;
     
         }
         else if (type=="group")
         {
           let itemgroup = this.cartservice.itemgroup.items ;
           let query = text.toLowerCase();
           this.itemgroups = itemgroup.filter(item => item.itemgroupname.toLowerCase().indexOf(query) >= 0);
           return;
         }
     
       }
     
       changesortby(event)
       {
         this.sortby = event.target.value;
       }
     
      
     
       applysort(direction)
       {
         
        let sortby = this.sortby;
         if(direction == "up")
         {
           this.sortup = false;
           this.sortdown = true;
           this.items.sort((a, b) => a[sortby] - b[sortby]);
         }
         else
         {
           this.sortup = true;
           this.sortdown = false;
           this.items.sort((a, b) => b[sortby] - a[sortby]);
         }
         
       }
       
       checkitemunits(modalid,item)
       {
         debugger
          if(item.itemunitsdetails.length > 0)
          {
            let units = item;
             this.open(modalid,units);
          }
          else
          {
            this.addtocart(item);
          }
       }
     
       open(modalid,data) {
         console.log(modalid);
         this.units = data;
         this.modalService.open(modalid, {size: 'lg' }).result.then((result) => {
             
         }, (reason) => {
           
         });
       }
       selectunit(unit,item)
       {
         
       debugger
          let index = this.cartservice.units.units.findIndex(u => u.factorunit === unit.factorunit && u.itemname == unit.itemno);
          if(index != -1)
          {
            this.cartservice.units.units.splice(index,1);
            return;
          }
          
          this.cartservice.units.units.push({ 
            ID: unit.factorunit,
            itemname: item.itemname,
            itemno:item.itemno,
            factorunit:unit.factorunit,
            factorunitname:unit.factorunitname,
            factorno:unit.factorunit,
            baseunitno:unit.factorunit,
            saleprice: unit.dsaleprice,
            quantity: unit.qty,
            amount:unit.dsaleprice * unit.qty,
            discount:item.discountpercentage,
            discountamount:(unit.dsaleprice * unit.qty)*(item.discountpercentage / 100),
            netamount:unit.netamount,
            rowno :unit.factorunit
          });
          
       }
       calctotal(unit,discount)
       {
         debugger
         if(unit.qty == 0 || unit.qty == null)
         {
          let index = this.cartservice.units.units.findIndex(u => u.factorunit === unit.factorunit);
          if(index != -1)
          {
            this.cartservice.units.units.splice(index,1)
          }
        
            return;
         }
         var amount = unit.qty * unit.dsaleprice;
         var discountamount = (discount/100)*amount;
         var netamount = amount - discountamount;
          unit.total =  amount;//unit.qty * unit.dsaleprice;
          unit.netamount =  netamount;
       }
       saveunit()
       {
         debugger
         if(this.cartservice.units.units.length != 0)
         {
          this.cartservice.units.units.forEach(element => {
            this.addtocart(element)
          });
          this.modalService.dismissAll();
          
         }
         else
         {
          this.toastr.error("No unit selected")
         }


        
       }

}
