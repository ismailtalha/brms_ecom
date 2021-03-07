import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { MDBBootstrapModule  } from 'mdbootstrap'
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ShopComponent, ItemDetailComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    NgxPaginationModule,
    NgbModule
    
  ]
})
export class ShopModule { }
