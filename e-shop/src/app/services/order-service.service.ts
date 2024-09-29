import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  private baseUrl: string = '';
  private ordersRoute: string = '';
  productImage: string = '';
  apiKey: string = ``;
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient, private _cookiesService:CookieService) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.ordersRoute = this._GlobalService.ordersRoute;
    this.apiKey = this._GlobalService.apiKey;
    this.productImage = this._GlobalService.productImage;
  };

  getOrders(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.ordersRoute}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  createOrder(): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.ordersRoute}`, { address: { city: 'Belbes', state: 'sharqia' } }, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${this._cookiesService.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

}
