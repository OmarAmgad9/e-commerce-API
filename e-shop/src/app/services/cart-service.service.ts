import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private baseUrl:string='';
  private cartUrl:string='';
  private apiKey:string= ''
  private couponRoute:string='';
  cartImage:string=''
  constructor(private _GlobalService:GlobalService, private _HttpClient:HttpClient, private _cookiesService: CookieService) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.cartUrl = this._GlobalService.cartRoute;
    this.apiKey = this._GlobalService.apiKey;
    this.cartImage = this._GlobalService.productImage;
    this.couponRoute = this._GlobalService.couponsRoute
  }

  getCart():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}${this.cartUrl}`,{
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials:true,
    })
  }
  addCart(product: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.cartUrl}`, { product }, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${this._cookiesService.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }
  removeFromCart(item: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.cartUrl}/${item}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${this._cookiesService.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.cartUrl}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${this._cookiesService.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }


  applyCoupon(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.cartUrl}/applyCoupon`, formData, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${this._cookiesService.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }
}
