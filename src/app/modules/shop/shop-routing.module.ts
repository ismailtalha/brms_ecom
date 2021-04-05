import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturedComponent } from './featured/featured.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { NewarivalComponent } from './newarival/newarival.component';
import { ShopComponent } from './shop/shop.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ShopComponent,
        
      } ,
      {
        path: 'featured',
        component: FeaturedComponent,
        
      } ,
      {
        path: 'newarrival',
        component: NewarivalComponent,
        
      } ,
      {
        path: 'itemdetail/:id',
        component: ItemDetailComponent,
        
      }    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
