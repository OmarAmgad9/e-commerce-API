import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistServiceService{
private baseUrl:string='';
private wishlistRoute:string='';
private apiKey:string= ''
private couponRoute:string='';
cartImage:string=''
constructor(private _GlobalService:GlobalService, private _HttpClient:HttpClient, private _cookiesService: CookieService) {
  this.baseUrl = this._GlobalService.baseUrl;
  this.wishlistRoute = this._GlobalService.wishlistRoute;
  this.apiKey = this._GlobalService.apiKey;
  this.cartImage = this._GlobalService.productImage;
  // this.couponRoute = this._GlobalService.couponsRoute
}

getCart():Observable<any>{
  return this._HttpClient.get(`${this.baseUrl}${this.wishlistRoute}`,{
    headers: {
      "X-API-KEY": `${this.apiKey}`,
      authorization: `Bearer ${localStorage.getItem('user')}`
    },
    withCredentials:true,
  })
}
addCart(product: string): Observable<any> {
  return this._HttpClient.post(`${this.baseUrl}${this.wishlistRoute}`, { product }, {
    headers: {
      "X-API-KEY": `${this.apiKey}`,
      "X-CSRF-Token": `${this._cookiesService.get('cookies')}`,
      authorization: `Bearer ${localStorage.getItem('user')}`,
    },
    withCredentials: true
  })
}
removeFromCart(item: string): Observable<any> {
  return this._HttpClient.delete(`${this.baseUrl}${this.wishlistRoute}/${item}`, {
    headers: {
      "X-API-KEY": `${this.apiKey}`,
      "X-CSRF-Token": `${this._cookiesService.get('cookies')}`,
      authorization: `Bearer ${localStorage.getItem('user')}`,
    },
    withCredentials: true
  })
}

clearCart(): Observable<any> {
  return this._HttpClient.delete(`${this.baseUrl}${this.wishlistRoute}`, {
    headers: {
      "X-API-KEY": `${this.apiKey}`,
      "X-CSRF-Token": `${this._cookiesService.get('cookies')}`,
      authorization: `Bearer ${localStorage.getItem('user')}`,
    },
    withCredentials: true
  })
}


// applyCoupon(formData: any): Observable<any> {
//   return this._HttpClient.put(`${this.baseUrl}${this.wishlistRoute}/applyCoupon`, formData, {
//     headers: {
//       "X-API-KEY": `${this.apiKey}`,
//       "X-CSRF-Token": `${this._cookiesService.get('cookies')}`,
//       authorization: `Bearer ${localStorage.getItem('user')}`
//     },
//     withCredentials: true
//  })
}
