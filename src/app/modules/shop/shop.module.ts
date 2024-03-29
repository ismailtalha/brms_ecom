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
import { FeaturedComponent } from './featured/featured.component';
import { NewarivalComponent } from './newarival/newarival.component';
import { OwlModule } from 'ngx-owl-carousel';
import { BaseshopComponent } from './baseshop/baseshop.component';
import { TableModule } from 'primeng/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { PositivenumberDirective } from 'src/app/Utilities/positivenumber.directive';

@NgModule({
  declarations: [ShopComponent, ItemDetailComponent, FeaturedComponent, NewarivalComponent, BaseshopComponent,PositivenumberDirective],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    NgxPaginationModule,
    NgbModule,
    OwlModule
    
    
  ]
})
export class ShopModule { }
