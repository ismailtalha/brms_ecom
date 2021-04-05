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
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          showDenyButton: true,
          denyButtonText: `Print Order`,
          confirmButtonText:
            '<i class="fa fa-print"></i>Export PDF',
          confirmButtonAriaLabel: 'Export PDF',
          cancelButtonText:
            'OK',
          cancelButtonAriaLabel: 'OK'
        })
  }
}
