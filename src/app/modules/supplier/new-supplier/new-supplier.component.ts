import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css']
})
export class NewSupplierComponent implements OnInit {
  supplier = new FormGroup({
    Name: new FormControl(null, Validators.required),
    Phone: new FormControl(null),
    Email: new FormControl(null, Validators.email),
    AccountId: new FormControl(25, Validators.required),
    OpeningBalance: new FormControl(null, Validators.required)
  });
  edit: any;
  accounts: any;
  defaultAccount: any;
  constructor(private dataService: DataService, private loader: NgxUiLoaderService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

    @HostListener('document:keyup', ['$event'])
    onKeyUp (event: KeyboardEvent) {
      if (event.keyCode == 18) {
        this.create();
        event.preventDefault();
      }
    }
  ngOnInit(): void {
    if(this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getSupplierById(id).subscribe((res: any)=>{
        let data = res.data;
        this.supplier.patchValue({
          Name: data[0]?.Name,
          Phone: data[0]?.Phone,
          Email: data[0]?.Email,
          AccountId: data[0]?.AccountId,
          OpeningBalance: data[0]?.OpeningBalance
        });
        this.loader.stop();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
  }

  create() {
    if(this.supplier.valid) {
      this.loader.start();
      if (this.edit) {
        this.dataService.updateSupplier(this.edit, this.supplier.value).subscribe((res)=>{
          console.log(res);
          this.loader.stop();
          this.router.navigate(['supplier']);
          this.toastr.success('Supplier Updated Successfully');
        },(err)=>{
          this.toastr.error(err, "Error");
          console.log(err);
          this.loader.stop();
        });
      } else {
        this.dataService.createSupplier(this.supplier.value).subscribe((res)=>{
          console.log(res);
          this.loader.stop();
          this.router.navigate(['supplier']);
          this.toastr.success('New Supplier Added Successfully');
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

