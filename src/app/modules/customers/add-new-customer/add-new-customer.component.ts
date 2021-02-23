import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.css']
})
export class AddNewCustomerComponent implements OnInit {
  customers = new FormGroup({
    Name: new FormControl(null, Validators.required),
    Phone: new FormControl(null),
    Email: new FormControl(null, Validators.email),
    AccountId: new FormControl(26, Validators.required),
    OpeningBalance: new FormControl(0),
    OpeningBalanceType: new FormControl(null) 
  });
  edit: any;
  accounts: any;
  constructor(private dataService: DataService, private loader: NgxUiLoaderService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    if(this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getCustomerById(id).subscribe((res: any)=>{
        let data = res.data;
        this.customers.patchValue({
          Name: data[0]?.Name,
          Phone: data[0]?.Phone,
          Email: data[0]?.Email,
          AccountId: data[0]?.AccountId,
          OpeningBalance: data[0]?.OpeningBalance,
          OpeningBalanceType: data[0]?.OpeningBalanceType
        });
        this.loader.stop();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp (event: KeyboardEvent) {
    if (event.keyCode == 18) {
      this.create();
      event.preventDefault();
    }
  }

  create() {
    if(this.customers.valid) {
      this.loader.start();
      if (this.edit) {
        this.dataService.updateCustomer(this.edit,this.customers.value).subscribe((res)=>{
          console.log(res);
          this.loader.stop();
          this.router.navigate(['customers']);
          this.toastr.success('Customers Updated Successfully');
        },(err)=>{
        console.log(err);
        this.toastr.error(err, "Error");
        this.loader.stop();
      });
      } else {
        if (this.customers.value.OpeningBalance > 0 && this.customers.value.OpeningBalanceType === null) {
          this.toastr.error('Please Select Opening Type Balance', "Error");
          this.loader.stop();
        } else {
          this.dataService.createCustomer(this.customers.value).subscribe((res)=>{
            console.log(res);
            this.loader.stop();
            this.router.navigate(['customers']);
            this.toastr.success('New Customers Added Successfully');
          },(err)=>{
            this.toastr.error(err, "Error");
          console.log(err);
          this.loader.stop();
        });
        }
      }
      
    } else {
      this.toastr.error("Please Fill all fields", "Error");
    }
  }

}
