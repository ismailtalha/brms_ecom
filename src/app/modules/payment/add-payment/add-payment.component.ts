import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  date = new Date();
  payment = new FormGroup({
    UserId: new FormControl(localStorage.getItem('id')),
    Date: new FormControl(formatDate(this.date, 'yyyy-MM-dd', 'en'), Validators.required),
    InvoiceNo: new FormControl('PT'),
    Amount: new FormControl(null, Validators.required),
    PaymentType: new FormControl('Cash', Validators.required),
    Description: new FormControl(null),
    UserAccountId: new FormControl(localStorage.getItem('userAccountId')),
    FromAccountId: new FormControl(null, Validators.required),
    ToAccountId: new FormControl(null, Validators.required),
    ToTransactionType: new FormControl(null, Validators.required),
    FromTransactionType: new FormControl(null, Validators.required)
  });
  edit: any;
  accounts: any;
  glAccounts: any = [];
  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.loader.start();
    this.dataService.getAccounts().subscribe((res: any) => {
      if (res?.code === 200) {
        this.glAccounts = [...res?.data];
      }
      this.loader.stop();
    }, (err) => {
      this.loader.stop();
    });
    if (this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getPaymentById(id).subscribe((res: any) => {
        this.payment.patchValue({
          Date: res[0]?.Date,
          InvoiceNo: res[0]?.InvoiceNo,
          Amount: res[0]?.Amount,
          PaymentType: res[0]?.PaymentType,
          Description: res[0]?.Description,
          AccountId: res[0]?.AccountId,
          FromTransactionType: res[0]?.AccountId,
          ToTransactionType: res[0]?.AccountId
        });
        this.loader.stop();
      }, (err) => {
        console.log(err);
        this.loader.stop();
      });
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp (event: KeyboardEvent) {
    if (event.keyCode === 18) {
      this.create();
      event.preventDefault();
    }
  }

  create() {
    if (this.payment.valid) {
      this.loader.start();
      if (this.edit) {
        this.dataService.updatePayment(this.edit, this.payment.value).subscribe((res) => {
          console.log(res);
          this.loader.stop();
          this.router.navigate(['payment']);
          this.toastr.success('Payment Updated Successfully');
        },(err)=>{
        console.log(err);
        this.toastr.error(err, "Error");
        this.loader.stop();
      });
      } else {
        const payload = {
          payment: {
            ...this.payment.value
          }
        };
          this.dataService.createPayment(payload).subscribe((res)=>{
            console.log(res);
            this.loader.stop();
            this.router.navigate(['payment']);
            this.toastr.success('New Payment Added Successfully');
          },(err)=>{
            this.toastr.error(err, "Error");
          console.log(err);
          this.loader.stop();
        });
      }
      
    } else {
      this.toastr.error("Please Fill all fields", "Error");
    }
  }


}
