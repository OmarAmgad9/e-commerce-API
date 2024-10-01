import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../interface/product';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WishlistServiceService } from '../services/wishlist-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent  implements  OnInit, OnDestroy {

  products: Product[]=[]
  imgDomain:string='';
  productCart:any={};
  cart:string='Cart';
  subscription: any='';
  length:number=0;
  date:any = Date.now()
  couponForm = new FormGroup({
    name: new FormControl(null, [ Validators.required]),
  })
  constructor(private _wishlist:WishlistServiceService,private _Router: Router) { }


  loadCart(){
    this.subscription = this._wishlist.getCart().subscribe({
      next:(res)=>{
        this.productCart=res.data
        console.log(this.productCart)
        this.length=res.length
      },
      error:(err)=>{}
    })
  }
  removeProduct(itemId: string) {
    this._wishlist.removeFromCart(itemId).subscribe({
      next: (res) => {
        console.log(res)
        this.loadCart();
        alert('product removed from cart')
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  clearCart() {
    this._wishlist.clearCart().subscribe({
      next: (res) => {
        alert('cart is clear');
        this._Router.navigate(['/home']);
      },
      error: (err) => { }
    })
  }

  // applyCoupon(formData: FormGroup) {
  //   this._cartService.applyCoupon(formData.value).subscribe({
  //     next: (res) => {
  //       this.loadCart();
  //       alert('coupon applied');
  //     },
  //     error: (err) => {
  //     }
  //   })
  // }

  // checkout() {
  //   this._OrdersService.createOrder().subscribe({
  //     next: (res) => {
  //       alert('order created successfully');
  //       this._Router.navigate(['/myOrders']);
  //     },
  //     error: (err) => { }
  //   })
  // }


  ngOnInit():void{
    this.imgDomain = this._wishlist.cartImage;
    this.loadCart()
    const currentDate = new Date();
    const futureDate = new Date(currentDate); // Create a copy of the current date
    futureDate.setDate(futureDate.getDate() + 3); // Add 3 days
    this.date= futureDate.toDateString();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
