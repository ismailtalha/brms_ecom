import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public service:GetDataService) { }

  ngOnInit(): void {
  }

}
