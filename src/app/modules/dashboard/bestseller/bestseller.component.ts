import { Component, OnInit } from '@angular/core';
import { ngxLightOptions } from 'ngx-light-carousel';

@Component({
  selector: 'app-bestseller',
  templateUrl: './bestseller.component.html',
  styleUrls: ['./bestseller.component.css']
})
export class BestsellerComponent implements OnInit {
  options: ngxLightOptions;
  slides: any[]	;
  constructor() {
    
    this.options = {
    animation: {
      animationClass: 'transition',
      animationTime: 200,
    },
    swipe: {
      swipeable: true,
      swipeVelocity: 1,
    },
    drag: {
      draggable: true,
      dragMany: true,
    },
    scroll: {
	    numberToScroll:  2
    },
    infinite: true,
    autoplay: {
      enabled: true,
      direction: 'right',
      delay: 5000,
      stopOnHover: true,
    },
    breakpoints: [
      {
        width: 768,
        number: 1,
      },
      {
        width: 991,
        number: 3,
      },
      {
        width: 9999,
        number: 4,
      },
    ],
  }
  this.slides = []
  this.slides.push({
    title: 'RED Widgets',
    url: 'https://url',
    image: `http://picsum.photos/600/400/?0`,
  })
  this.slides.push({
    title: 'YELLOW Widgets',
    url: 'https://url',
    image: `http://picsum.photos/600/400/?1`,
  })
  this.slides.push({
    title: 'Black Widgets',
    url: 'https://url',
    image: `http://picsum.photos/600/400/?2`,
  })
  this.slides.push({
    title: 'Grey Widgets',
    url: 'https://url',
    image: `http://picsum.photos/600/400/?3`,
  })
  this.slides.push({
    title: 'Green Widgets',
    url: 'https://url',
    image: `http://picsum.photos/600/400/?4`,
  })
  

}

		

  ngOnInit(): void {
  }
  

}
