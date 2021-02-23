import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent implements OnInit {
  users = [];
  screens = [];
  permissions = [];
  userWithPermission = [];
  allowed = true;
  notAllowed = false;

  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.loader.start();
    this.dataService.getPermissions().subscribe((res: any) => {
      this.users = res[0]?.length > 0 ? [...res[0]] : [];
      this.screens = res[1]?.length > 0 ? [...res[1]] : [];
      this.permissions = res[2]?.length > 0 ? [...res[2]] : [];
      if (this.users.length > 0 && this.permissions.length > 0 && this.screens.length > 0) {
        this.users.forEach(user => {
          const permission: any = this.permissions.filter(item => item.UserId === user.Id);
          const obj = {
            user: user,
            permission: permission
          };
          this.userWithPermission.push(obj);
        });
      }
        this.loader.stop();
    }, (err) => {
      console.log(err);
      this.loader.stop();
    });
  }

  change(userId, screenId, permission) {
    this.loader.start();
    const payload = {
      UserId: userId,
      ScreenId: screenId,
      Permission: permission
    };
    this.dataService.changePermission(payload).subscribe((res: any) => {
    this.loader.stop();
    }, (err) => {
      console.log(err);
      this.loader.stop();
    });
  }

}
