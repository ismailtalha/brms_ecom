import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  account = new FormGroup({
    Name: new FormControl(null, Validators.required),
    TypeID: new FormControl('1', Validators.required),
    OpeningBalance: new FormControl(0),
    OpeningBalanceType: new FormControl(null)
  });
  edit: any;
  accountTypes: any = [];
  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    if (this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      const id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getAccountById(id).subscribe((res: any) => {
        const data = res.data;
        this.account.patchValue({
          Name: data[0]?.Name,
          TypeID: data[0]?.TypeID,
          OpeningBalance: data[0]?.OpeningBalance,
          OpeningBalanceType: data[0]?.OpeningBalanceType
        });
        this.loader.stop();
      }, (err) => {
        console.log(err);
        this.loader.stop();
      });
    }
    this.loader.start();
    this.dataService.getAccountTypeRecords().subscribe((res: any) => {
      if (res?.code === 200) {
        this.accountTypes = [...res?.data];
        this.loader.stop();
      } else {
        this.loader.stop();
      }
    }, (err) => {
      console.log(err);
      this.loader.stop();
    });
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp (event: KeyboardEvent) {
    if (event.keyCode === 18) {
      this.create();
      event.preventDefault();
    }
  }
  create() {
    if (this.account.valid) {
      this.account.patchValue({
        OpeningBalance: (this.account.getRawValue().OpeningBalance === null) ? 0 : this.account.getRawValue().OpeningBalance
      });
      this.loader.start();
      if (this.edit) {
        this.dataService.updateAccount(this.edit, this.account.value).subscribe((res) => {
          this.loader.stop();
          this.router.navigate(['accounts']);
          this.toastr.success('Account Updated Successfully');
        }, (err) => {
          this.toastr.error(err, 'Error');
          console.log(err);
          this.loader.stop();
        });
      } else {
        this.dataService.createAccount(this.account.value).subscribe((res) => {
          this.loader.stop();
          this.router.navigate(['accounts']);
          this.toastr.success('New Account Added Successfully');
        }, (err) => {
          this.toastr.error(err, 'Error');
          this.loader.stop();
        });
      }
    } else {
      this.toastr.error('Please Fill all fields', 'Error');
    }
  }

}
