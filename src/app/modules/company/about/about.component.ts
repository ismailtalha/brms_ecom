import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public service:GetDataService) { }

  ngOnInit(): void {
    console.log('company' , this.service);
  }

  

}
