import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-account-type',
  templateUrl: './new-account-type.component.html',
  styleUrls: ['./new-account-type.component.css']
})
export class NewAccountTypeComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(null, Validators.required)
  });
  edit: any;
  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    if (this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      const id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getAccountTypeById(id).subscribe((res: any) => {
        const data = res.data;
        this.form.patchValue({
          name: data[0]?.Name
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
      event.preventDefault();
      this.onSave();
    }
  }

  onSave() {
    if (this.form.valid) {
      const payload = {
        name: this.form.getRawValue().name
      };
      this.loader.start();
      if (this.edit) {
        this.dataService.updateAccountType(this.edit, payload).subscribe((res) => {
          this.loader.stop();
          this.router.navigate(['accounts/account-type']);
          this.toastr.success('Account Type Updated', 'Success');
        }, (err) => {
          console.log(err);
          this.toastr.error(err, 'Error');
          this.loader.stop();
        });
      } else {
        this.dataService.createAccountType(payload).subscribe((res: any) => {
          this.router.navigate(['accounts/account-type']);
            this.toastr.success('New Account Type Added Successfully');
          this.loader.stop();
        }, (err) => {
          this.loader.stop();
        });
      }
    } else {
      this.toastr.error('Please Fill all fields", "Error');
    }
  }

}
