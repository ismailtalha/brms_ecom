import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { GetDataService } from 'src/app/services/getdata.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  images:any = ['../../../../assets/img/products/4.jpg']
  singleitem : any;
  constructor(public cartservice:GetDataService,private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }
    itemdetail = new FormGroup({
      numpad: new FormControl(0, Validators.required),
    
    });
  ngOnInit(): void {
    this.getsingleproduct();
    if($.isFunction('owlCarousel')){
      $("#owl-demo").owlCarousel({
        navigation : true
      });
    }
  }
  addtocart(data) {
    let items = [];
    var index = this.cartservice.cartdata.items.findIndex(x => x.ID === data.rowno);
    let obj = {
      ID: data.rowno,
      itemname: data.itemname,
      itemno:data.itemno,
      price: data.saleprice,
      quantity: this.itemdetail.value.numpad,
      amount:data.saleprice * this.itemdetail.value.numpad
    }
    if (index < 0) {
      this.cartservice.cartdata.items.push(obj)
    }
    else {
      this.cartservice.cartdata.items[index].amount = 0;
      this.cartservice.cartdata.items[index].quantity = this.cartservice.cartdata.items[index].quantity + this.itemdetail.value.numpad;

      this.cartservice.cartdata.items[index].amount = this.cartservice.cartdata.items[index].quantity * this.cartservice.cartdata.items[index].price;
    }
    this.cartservice.cartdata.count = this.cartservice.cartdata.count + this.itemdetail.value.numpad;
    // this.cartservice.cartdata.items = items;
    this.cartservice.cartdata.total = 0;
    for (let index = 0; index < this.cartservice.cartdata.items.length; index++) {
      const element = this.cartservice.cartdata.items[index];
      this.cartservice.cartdata.total = this.cartservice.cartdata.total + element.amount;
    }
    localStorage.setItem('cart-data', JSON.stringify(this.cartservice.cartdata))
  }
  // addtocart(data)
  // {
  //    let items = [];
  //    var index = this.cartservice.cartdata.items.findIndex(x => x.ID === data.rowno);
  //    let obj = {
  //     ID:data.rowno,
  //     Name:data.itemname,
  //     Price:data.saleprice,
  //     ItemName:data.itemname,
  //     Qty:this.itemdetail.value.numpad,
  //     Total:data.saleprice * this.itemdetail.value.numpad
  //   }
  //   if(index < 0)
  //   {
  //     this.cartservice.cartdata.items.push(obj)
  //   }
  //   else
  //   {
      
  //     this.cartservice.cartdata.items[index].Total = 0;
  //     this.cartservice.cartdata.items[index].Qty = this.cartservice.cartdata.items[index].Qty + this.itemdetail.value.numpad;

  //     this.cartservice.cartdata.items[index].Total = this.cartservice.cartdata.items[index].Qty *  this.cartservice.cartdata.items[index].Price;
  //   }
  //    this.cartservice.cartdata.count = this.cartservice.cartdata.count + this.itemdetail.value.numpad;
  //   // this.cartservice.cartdata.items = items;
  //   this.cartservice.cartdata.total = 0;
  //   for (let index = 0; index < this.cartservice.cartdata.items.length; index++) {
  //     const element = this.cartservice.cartdata.items[index];
  //     this.cartservice.cartdata.total =this.cartservice.cartdata.total +  element.Total;
  //   }
  //    localStorage.setItem('cart-data',JSON.stringify(this.cartservice.cartdata) )
  // }
  getsingleproduct() {

    if (this.route.snapshot.params.id) {
      let id = this.route.snapshot.params.id;
     console.log('idddddddddd' , id)
      this.loader.start();
      this.dataService.getsingleProduct(id).subscribe((res:any) => {
debugger
        this.singleitem = {};
        this.singleitem = res ;
        console.log(res?.data)
        this.loader.stop();
      })
    }
    }

  }
