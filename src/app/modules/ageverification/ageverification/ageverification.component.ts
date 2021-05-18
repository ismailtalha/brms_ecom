import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ageverification',
  templateUrl: './ageverification.component.html',
  styleUrls: ['./ageverification.component.css']
})
export class AgeverificationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  gotoshop()
  {
     this.router.navigate['/shop']
  }
}
