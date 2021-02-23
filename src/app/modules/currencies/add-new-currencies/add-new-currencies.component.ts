import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-currencies',
  templateUrl: './add-new-currencies.component.html',
  styleUrls: ['./add-new-currencies.component.css']
})
export class AddNewCurrenciesComponent implements OnInit {
  currency = new FormGroup({
    Name: new FormControl(null, Validators.required),
    Code: new FormControl(null, Validators.required),
    OpeningQty: new FormControl(null),
    OpeningAmount: new FormControl(null)
  });
  edit: any;
  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      const id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getCurrenyById(id).subscribe((res: any) => {
        const data = res.data;
        this.currency.patchValue({
          Name: data[0]?.Name,
          Code: data[0]?.Code,
          OpeningQty: data[0]?.OpeningQty,
          OpeningAmount: data[0]?.OpeningAmount
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
    if (this.currency.valid) {
      this.loader.start();
      if (this.edit) {
        this.dataService.updateCurrency(this.edit, this.currency.value).subscribe((res) => {
          this.loader.stop();
          this.router.navigate(['currencies']);
          this.toastr.success('Currency Updated', 'Success');
        }, (err) => {
          console.log(err);
          this.toastr.error(err, 'Error');
          this.loader.stop();
        });
      } else {
        this.dataService.createCurrency(this.currency.value).subscribe((res) => {
          this.loader.stop();
          this.router.navigate(['currencies']);
          this.toastr.success('New Currncy Added Successfully', 'Success');
        }, (err) => {
          console.log(err);
          this.toastr.error(err, 'Error');
          this.loader.stop();
        });
      }
    } else {
      this.toastr.error('Please Fill all fields', 'Error');
    }
  }

}
