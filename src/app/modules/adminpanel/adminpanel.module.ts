import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './adminpanel-routing.module';
import { PanelComponent } from './panel/panel.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [PanelComponent, UsersComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule
  ]
})
export class AdminpanelModule { }
