import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgeverificationComponent } from './ageverification/ageverification.component';
import { AgeVerificationRoutingModule } from './ageverification-routing.module';



@NgModule({
  declarations: [AgeverificationComponent],
  imports: [
    CommonModule,
    AgeVerificationRoutingModule
  ]
})
export class AgeverificationModule { }
