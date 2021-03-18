import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  successtwobuttons(text)
  {
    return  Swal.fire({
          title: '<strong>Order Status</strong>',
          icon: 'success',
          html:
          'Order has been Placed,</b>, '+
            `Order #<b>${text}</b>, `,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-print"></i> Print Order',
          confirmButtonAriaLabel: 'Print Order',
          cancelButtonText:
            'OK',
          cancelButtonAriaLabel: 'OK'
        })
  }
}
