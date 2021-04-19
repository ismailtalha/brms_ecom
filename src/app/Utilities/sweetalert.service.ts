import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  successtwobuttons(text,compname)
  {
    return  Swal.fire({
          title: '<strong> Order # <b>' + text + '</b>, `</strong>',
          icon: 'success',
          html:
          'Thank you for shopping at' + compname  + ', your order has been received. You can view the order details from the my orders option located on the top right. ,</b>, '
           ,
          showCloseButton: false,
          showCancelButton: true,
          focusConfirm: false,
          showDenyButton: false,

          denyButtonText: `Print`,
          confirmButtonText:
            '<i class="fa fa-print"></i>Order',
          confirmButtonAriaLabel: 'Order',
          cancelButtonText:
            'OK',
          cancelButtonAriaLabel: 'OK'
        })
  }
}
