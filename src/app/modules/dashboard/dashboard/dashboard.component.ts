import { Component, OnInit } from '@angular/core';

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../../variables/charts";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  constructor() { }

  ngOnInit() {
  }


   
  addtocart()
  {
    alert('sdffsd')
  }


}
