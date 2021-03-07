import { Injectable } from "@angular/core";
import { cart } from "../models/cart.model";
import { category } from "../models/category";
import {company} from '../models/company.model'
import { itemgroup } from "../models/itemgroup";
import { allitems } from "../models/items.model";
import { customer } from "../models/customer.model";
import { user } from "../models/user.model";
import { brands } from "../models/brands.models";
import { ordercheckoutmodel } from "../models/order.models";



@Injectable({
    providedIn: 'root'
  })
  export class GetDataService {
    cartdata : cart;
    companydata:company;
    category:category;
    itemgroup:itemgroup;
    allitems : allitems;
    customer : customer;
    user:user;
    brands:brands;
    ordercheckoutmodel:ordercheckoutmodel;
    constructor() {
         this.cartdata = new cart();
         this.companydata = new company();
         this.category = new category();
         this.itemgroup = new itemgroup();
         this.allitems = new allitems();
         this.customer = new customer();
         this.user = new user();
         this.brands = new brands();
         this.ordercheckoutmodel = new ordercheckoutmodel();
     }

   
  }