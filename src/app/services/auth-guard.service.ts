import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { GetDataService } from './getdata.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private cookies: CookieService , private getdataservice : GetDataService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (state.url !== '/auth/login') {
    //   if (this.cookies.get('token') && localStorage.getItem('userName')) {
    //     return true;
    //   }
    //   this.router.navigate(['auth']);
    //   return false;
    // }
    if(state.url == '/order/checkout')
    {
      if(this.getdataservice.cartdata.count == 0)
      {
        this.router.navigate(['shop']);
        return false;
      }
       
    }
    return true;
  }
}
