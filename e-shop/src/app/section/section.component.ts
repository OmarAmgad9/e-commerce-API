import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, Input, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { WishlistServiceService } from '../services/wishlist-service.service';

declare var $: any;
// import * as $ from 'jquery';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})


export class SectionComponent implements OnInit{
  @Input() products: any[] = [];
  @Input() title: string = '';
  @Input() id: number = 0;
  @Input() domain: string = ''
  constructor(private _cartService:CartServiceService, private _wishlist:WishlistServiceService) {}

  ngOnInit(): void {
    setTimeout(function(){
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      autoplay: true,        // Enables automatic movement
      autoplayTimeout: 1000,  // Set time between slides (in milliseconds)
      autoplayHoverPause: true, // Stops autoplay when you hover over the carousel
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    })}, 500);
  }
  addToCart(productId:string){
    this._cartService.addCart(productId).subscribe({
      next:(value)=> {
        alert('you Product Add To Cart')
      },
      error(err) {
        console.log(err)
      },
    })
  }
  addToWishlist(productId:string){
    this._wishlist.addCart(productId).subscribe({
      next:(value)=> {
        alert('you Product Add To Wishlist')
      },
      error(err) {
        console.log(err)
      },
    })
  }
}
