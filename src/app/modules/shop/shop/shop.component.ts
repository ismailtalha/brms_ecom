import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { forkJoin, Observable } from 'rxjs';
import { itemgroup } from 'src/app/models/itemgroup';
import { DataService } from 'src/app/services/data.service';
import { EmitterService } from 'src/app/services/emitter.service';
import { GetDataService } from 'src/app/services/getdata.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  imageurl: any;
  companydata: any;
  categories: any = [];
  itemgroups: any = [];
  resbrands: any = [];
  filterarray: any = [];
  category: any = [];
  brands: any = [];
  itemsPerPage: any = 6;

  constructor(private dataService: DataService, public eventemitter: EmitterService, public cartservice: GetDataService, private toastr: ToastrService, private loader: NgxUiLoaderService) { }

  items: any = [];
  ngOnInit(): void {
    console.log('hello shop')
    this.getmultiplerequests();
    this.eventemitter.listen('searchproduct', data => {
      this.filter(data, 'productsearch')
    })
  } cards = [
    {
      title: 'Card Title 1',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 2',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 3',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 4',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 5',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 6',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 7',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 8',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 9',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
  ];
  perpageitems(num) {
    this.itemsPerPage = num;
  }
  public getmultiplerequests() {
    this.loader.start();
    let items = this.dataService.getProducts();
    let category = this.dataService.getcategory();
    let itemgroups = this.dataService.getitemgroup();
    let brands = this.dataService.getbrands();
    forkJoin([items, category, itemgroups, brands]).subscribe(([itemres, catres, itemgroupres, resbrands]) => {
      debugger
      this.items = itemres;
      this.cartservice.allitems.items = this.items;
      this.categories = catres;
      this.itemgroups = itemgroupres;
      this.resbrands = resbrands
      console.log('items', this.items, 'categories', this.categories, 'groups', this.itemgroups);
      this.loader.stop();
    }), (error) => {
      console.log(error);
      this.toastr.show(error, "Error Messege");
      this.toastr.error("error", "Database Connectivity")
      this.loader.stop();
    }

  }
  addtocart(data) {
    let items = [];
    var index = this.cartservice.cartdata.items.findIndex(x => x.ID === data.rowno);
    let obj = {
      ID: data.rowno,
      Name: data.itemname,
      Price: data.saleprice,
      ItemName: data.itemname,
      Qty: 1,
      Total: data.saleprice * 1
    }
    if (index < 0) {
      this.cartservice.cartdata.items.push(obj)
    }
    else {
      this.cartservice.cartdata.items[index].Total = 0;
      this.cartservice.cartdata.items[index].Qty = this.cartservice.cartdata.items[index].Qty + 1;

      this.cartservice.cartdata.items[index].Total = this.cartservice.cartdata.items[index].Qty * this.cartservice.cartdata.items[index].Price;
    }
    this.cartservice.cartdata.count = this.cartservice.cartdata.count + 1;
    // this.cartservice.cartdata.items = items;
    this.cartservice.cartdata.total = 0;
    for (let index = 0; index < this.cartservice.cartdata.items.length; index++) {
      const element = this.cartservice.cartdata.items[index];
      this.cartservice.cartdata.total = this.cartservice.cartdata.total + element.Total;
    }
    localStorage.setItem('cart-data', JSON.stringify(this.cartservice.cartdata))
  }
  addOrReplace(object) {

  }
  // singleproduct(data)
  // {
  //     this.router.navigate(['/accounts/edit-account', data?.id]);

  // }

  filter(data, filtertype) {
    debugger
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
}