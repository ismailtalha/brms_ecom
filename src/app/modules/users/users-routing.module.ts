import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UserComponent,
      }   
    ]
  },
  {
    path: 'addNewUser',
    component: NewUserComponent
  },
  {
    path: 'edit-user/:id',
    component: NewUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
