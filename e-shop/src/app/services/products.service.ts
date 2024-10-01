import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: string = ''
  private productsRoute: string = '';
  productImage : string = '';
  apiKey: string = ``;
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient, private _cookieService:CookieService) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.productsRoute = this._GlobalService.productRoute;
    this.productImage = this._GlobalService.productImage;
    this.apiKey = this._GlobalService.apiKey;
  }

  getAllProducts(limit: number = 16, page: number = 1, sort: string = '-createdAt', search: string, category?: string, subcategory?: string): Observable<any> {
    if (category) {
      return this._HttpClient.get(`${this.baseUrl}${this.productsRoute}?limit=${limit}&page=${page}&sort=${sort}&search=${search}&category=${category}`, {
        headers: {
          "X-API-KEY": `${this.apiKey}`
        },
        withCredentials: true
      })
    }
    else if(subcategory){
      return this._HttpClient.get(`${this.baseUrl}${this.productsRoute}?limit=${limit}&page=${page}&sort=${sort}&search=${search}&subcategory=${subcategory}`, {
        headers: {
          "X-API-KEY": `${this.apiKey}`
        },
        withCredentials: true
      })
    }else{
      return this._HttpClient.get(`${this.baseUrl}${this.productsRoute}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`, {
        headers: {
          "X-API-KEY": `${this.apiKey}`
        },
        withCredentials: true
      })
    }
  }
  getProduct(productId:String):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}${this.productsRoute}/${productId}`,{
      headers:{
        "X-API-KEY": `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  createOne(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.productsRoute}`, formData, {
      headers: {
        'X-API-KEY': this.apiKey,
        'X-CSRF-Token': `${this._cookieService.get('cookies')}`,
        'authorization': `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  updateOne(productId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.productsRoute}/${productId}`, formData, {
      headers: {
        'X-API-KEY': this.apiKey,
        'X-CSRF-Token': `${this._cookieService.get('cookies')}`,
        'authorization': `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  deleteOne(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.productsRoute}/${productId}`, {
      headers: {
        'X-API-KEY': this.apiKey,
        'X-CSRF-Token': `${this._cookieService.get('cookies')}`,
        'authorization': `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }






}
