import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  users = new FormGroup({
    Name: new FormControl(null, Validators.required),
    Phone: new FormControl(null),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, Validators.required),
    Type: new FormControl('admin', Validators.required)
  });
  edit: any;
  constructor(private dataService: DataService, private loader: NgxUiLoaderService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getUsersById(id).subscribe((res: any)=>{
        let data = res.data;
        this.users.patchValue({
          Name: data[0]?.Name,
          Phone: data[0]?.Phone,
          Email: data[0]?.Email,
          Password: data[0]?.Password,
          Type: data[0]?.Type
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
    if(this.users.valid) {
      this.loader.start();
      if (this.edit) {
        this.dataService.updateUser(this.edit, this.users.value).subscribe((res)=>{
          console.log(res);
          this.loader.stop();
          this.router.navigate(['users']);
          this.toastr.success(' User Updated Successfully');
        },(err)=>{
          console.log(err);
          this.toastr.error(err, "Error");
          this.loader.stop();
        });
      } else {
        this.dataService.createUser(this.users.value).subscribe((res)=>{
          console.log(res);
          this.loader.stop();
          this.router.navigate(['users']);
          this.toastr.success('New User Added Successfully');
        },(err)=>{
          console.log(err);
          this.toastr.error(err, "Error");
          this.loader.stop();
        });
      }
    } else {
      this.toastr.error("Please Fill all fields", "Error");
    }
  }

}
