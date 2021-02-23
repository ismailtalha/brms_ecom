import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { CompanyRoutingModule } from './company-routing.module';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [ContactComponent, AboutComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
