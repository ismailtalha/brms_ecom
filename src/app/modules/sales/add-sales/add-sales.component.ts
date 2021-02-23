import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css']
})
export class AddSalesComponent implements OnInit {
  date = new Date();
  header = new FormGroup({
    UserId: new FormControl(localStorage.getItem('id')),
    UserAccountId: new FormControl(localStorage.getItem('userAccountId')),
    AccountId: new FormControl(null, Validators.required),
    Date: new FormControl(formatDate(this.date, 'yyyy-MM-dd', 'en'), Validators.required)
  });

  detail = new FormGroup({
    Description: new FormControl(null),
    CostPrice: new FormControl(null, Validators.required),
    SalePrice: new FormControl(null),
    Qty: new FormControl(1, Validators.required),
    Amount: new FormControl(null),
    SaleAmount: new FormControl(null),
    CurrencyId: new FormControl(null, Validators.required)
  });


  details: any = [];
  currencies: any = [];
  glAccounts: any = [];
  amount: number;
  currencyStock: any;
  edit: any;
  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loader.start();
    forkJoin(
      this.dataService.getAccounts(),
      this.dataService.getCurrencies()
    )
    .subscribe(([res1, res2]: any) => {
      if (res1?.code === 200) {
        this.glAccounts = [...res1?.data];
      }
      if (res2?.code === 200) {
        this.currencies = [...res2?.data];
      }
      if (this.route.snapshot.params.id) {
        this.edit = this.route.snapshot.params.id;
        const id = this.route.snapshot.params.id;
        this.loader.start();
        this.dataService.getSalesById(id).subscribe((res: any) => {
          this.header.patchValue({
            Date: formatDate(res[0]?.Date, 'yyyy-MM-dd', 'en'),
            AccountId: res[0]?.AccountId
          });
          res[0]?.SaleDetails.forEach(element => {
            this.details.push(element);
          });
          this.loader.stop();
        }, (err) => {
          this.loader.stop();
        });
      }
      this.loader.stop();
    }, (err) => {
      this.loader.stop();
    });
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp (event: KeyboardEvent) {
    if (event.keyCode === 18) {
      event.preventDefault();
      this.onSave();
    }
  }

  add() {
    if (this.detail.value.Description === null) {
      this.detail.patchValue({
        Description: `Sale ${this.getCurrenyName(this.detail.value.CurrencyId)?.Code}  ${this.detail.value.Qty} @ ${this.detail.value.CostPrice}`
      });
    }
    this.detail.patchValue({
      SalePrice: this.detail.value.CostPrice
    });
    this.detail.patchValue({
      Amount: Number(this.detail.value.CostPrice) * Number(this.detail.value.Qty),
      SaleAmount: Number(this.detail.value.SalePrice) * Number(this.detail.value.Qty)
    });
    this.details.push(this.detail.value);
    this.detail.reset();
    this.currencyStock = '';
    this.amount = null;
  }

  calculateAmount(value) {
    if (this.detail.value.CostPrice && this.detail.value.Qty) {
      this.amount = Number(this.detail.value.CostPrice) * Number(this.detail.value.Qty);
    } else {
      this.amount = null;
    }
  }

  getCurrency(id) {
   return this.currencies.find((item) => {
     return item.Id === id;
   });
  }

  onEdit(value) {
    this.detail.patchValue({
      Description: value.Description,
      Amount: value.Amount,
      CostPrice: value.CostPrice,
      CurrencyId: value.CurrencyId,
      Qty: value.Qty
    });
    this.amount = value.Amount;
    const index = this.details.indexOf(value);
    this.details.splice(index, 1);

  }

  onDelete(value) {
    const index = this.details.indexOf(value);
    this.details.splice(index, 1);
  }

  onSave() {
    if (this.header.valid && this.details.length > 0) {
      const payload = {
        header: this.header.getRawValue(),
        details: this.details
      };
      this.loader.start();
      if (this.edit) {
        this.dataService.updateSales(this.edit, payload).subscribe((res: any) => {
          this.router.navigate(['sales']);
            this.toastr.success('Sale Updated Successfully');
          this.loader.stop();
        }, (err) =>  {
          this.loader.stop();
        });
      } else {
        this.dataService.createSale(payload).subscribe((res: any) => {
          this.router.navigate(['sales']);
            this.toastr.success('New Sale Added Successfully');
          this.loader.stop();
        }, (err) =>  {
          this.loader.stop();
        });
      }
    } else {
      this.toastr.error('Please Fill all fields', 'Error');
    }
  }

  onCurrencyChange(value) {
    this.currencyStock = value?.Stock;
  }

  getCurrenyName(id) {
    return this.currencies.find(item => item.Id === id);
  }

}
