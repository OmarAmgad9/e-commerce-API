import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: string = ''
  private productsRoute: string = '';
  productImage : string = '';
  apiKey: string = ``;
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {
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
    else {
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

}
