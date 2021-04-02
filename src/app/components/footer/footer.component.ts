import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetDataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();

  constructor(public companyservice : GetDataService,private toastr: ToastrService) { }

  ngOnInit() {
  console.log('footer' , this.companyservice)
  }
  subscribe()
  {
    this.toastr.error("This feature is temporariliy unavailable")
  }
}
