import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryServiceService {
  private baseUrl:string = '';
  private subCategoriesRoute:string='';
  private apiKey:string = '';
  private categoriesRoute:string=''
  constructor(private _HttpClient:HttpClient, private _GlobalService:GlobalService, private _cookieService:CookieService) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.subCategoriesRoute  = this._GlobalService.subCategoryRoute;
    this.apiKey = this._GlobalService.apiKey;
    this.categoriesRoute=this._GlobalService.categoryRoute;
  }
  getAll(limit:number=50, page:number=1, sort:string='name', search:string='', categoryId:string=''):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}${this.subCategoriesRoute}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,{
      headers:{
        'X-API-KEY': this.apiKey
      },
      withCredentials: true
    })
  }
  getOne(subCategoryId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}${this.subCategoriesRoute}/${subCategoryId}`,{
      headers:{
        'X-API-KEY': this.apiKey,
      },
      withCredentials: true
    })
  }

  createOne(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.subCategoriesRoute}`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': this.apiKey,
        "X-CSRF-Token": `${this._cookieService.get('cookies')}`
      },
      withCredentials: true
    })
  };

  updateOne(subcategoryId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.subCategoriesRoute}/${subcategoryId}`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': this.apiKey,
        "X-CSRF-Token": `${this._cookieService.get('cookies')}`
      },
      withCredentials: true
    })
  }
  getAllFilter(categoryId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.categoriesRoute}/${categoryId}/subcategories?limit=200&sort=name`, {
      headers: {
        'X-API-KEY': this.apiKey,
      },
      withCredentials: true
    })
  }

  deleteOne(subcategoryId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.subCategoriesRoute}/${subcategoryId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': this.apiKey,
        "X-CSRF-Token": `${this._cookieService.get('cookies')}`
      },
      withCredentials: true
    })
  }



}
