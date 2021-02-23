import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailComponent } from './item-detail/item-detail.component';
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
