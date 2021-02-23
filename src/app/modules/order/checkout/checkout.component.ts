import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(public cartservice:GetDataService) { }

  ngOnInit(): void {
  }

}
