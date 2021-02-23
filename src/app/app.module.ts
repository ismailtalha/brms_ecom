import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import {CookieService} from 'ngx-cookie-service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    LoginLayoutComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorService, 
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
