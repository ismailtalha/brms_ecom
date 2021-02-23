import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();

  constructor(public companyservice : GetDataService) { }

  ngOnInit() {
  console.log('footer' , this.companyservice)
  }

}
