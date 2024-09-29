import { Component, OnDestroy, OnInit } from '@angular/core';
import { SectionComponent } from "../section/section.component";
import { CartServiceService } from '../services/cart-service.service';
import { Product } from '../interface/product';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderServiceService } from '../services/order-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SectionComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements  OnInit, OnDestroy {

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
  constructor(private _cartService:CartServiceService,private _OrdersService:OrderServiceService  ,private _Router: Router) { }


  loadCart(){
    this.subscription = this._cartService.getCart().subscribe({
      next:(res)=>{
        this.productCart=res.data
        this.length=res.length
      },
      error:(err)=>{}
    })
  }
  removeProduct(itemId: string) {
    this._cartService.removeFromCart(itemId).subscribe({
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
    this._cartService.clearCart().subscribe({
      next: (res) => {
        alert('cart is clear');
        this._Router.navigate(['/home']);
      },
      error: (err) => { }
    })
  }

  applyCoupon(formData: FormGroup) {
    this._cartService.applyCoupon(formData.value).subscribe({
      next: (res) => {
        this.loadCart();
        alert('coupon applied');
      },
      error: (err) => {
      }
    })
  }

  checkout() {
    this._OrdersService.createOrder().subscribe({
      next: (res) => {
        alert('order created successfully');
        this._Router.navigate(['/myOrders']);
      },
      error: (err) => { }
    })
  }


  ngOnInit():void{
    this.imgDomain = this._cartService.cartImage;
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
