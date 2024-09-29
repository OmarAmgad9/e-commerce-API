import { CommonModule } from '@angular/common';
import {  Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interface/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
declare var bootstrap: any;



@Component({
  selector: 'app-signal-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signal-product.component.html',
  styleUrl: './signal-product.component.scss'
})
export class SignalProductComponent implements OnInit, OnDestroy {
  product: Product={};
  subscription:any;
  productId:any;
  imgDomain:string='';
  constructor(private _productService:ProductsService,  private _router: ActivatedRoute, private _cartService:CartServiceService){ }



  loadProduct(productId:string){
    this.subscription = this._productService.getProduct(productId).subscribe({
      next:(value)=> {
        this.product = value.data;
        console.log(this.product.images)
      },
      error:(err) =>{
        console.log(err)
      },
    })
  }

  ngOnInit(): void {
    this.productId = this._router.snapshot.params['id']
    this.imgDomain = this._productService.productImage;
    this.loadProduct(this.productId);

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  // to handle multiple image
   // Previous slide
   prevSlide(carouselElement: HTMLElement) {
    const carousel = new bootstrap.Carousel(carouselElement);
    carousel.prev();
  }

  // Next slide
  nextSlide(carouselElement: HTMLElement) {
    const carousel = new bootstrap.Carousel(carouselElement);
    carousel.next();
  }

  // Programmatically go to a specific slide (optional)
  goToSlide(carouselElement: HTMLElement, slideIndex: number) {
    const carousel = new bootstrap.Carousel(carouselElement);
    carousel.to(slideIndex);
  }

}


