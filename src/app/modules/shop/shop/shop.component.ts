import { Component, OnInit, ViewChild } from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
 
  @ViewChild('owlElement') owlElement: OwlCarousel
  constructor() { }

  items: any = [];
  ngOnInit(): void {
   
  } 

}
