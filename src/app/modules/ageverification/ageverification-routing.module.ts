import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgeverificationComponent } from './ageverification/ageverification.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AgeverificationComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgeVerificationRoutingModule { }
