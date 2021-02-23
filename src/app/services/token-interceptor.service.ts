import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,
HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private router: Router, 
    private cookies: CookieService,
    private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.cookies.get('token');

    if(idToken){
      const updatedRequest = request.clone({
        headers: request.headers.set("Authorization", idToken)
      });
      return next.handle(updatedRequest).pipe(catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                      this.router.navigate(['auth']);
                      this.toastr.error("Token Expired Please Login Again", "Error");
                    }
                }
                return Observable.throw(err);
            })) as any;
    }
    else{
      return next.handle(request);
    }
  
  }
}
