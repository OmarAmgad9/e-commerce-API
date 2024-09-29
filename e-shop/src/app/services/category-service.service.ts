import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  baseUrl:string = '';
  categoryRoute: string = '';
  apiKey:string = '';
  categoryImg:string='';
  constructor(private _GlobalService: GlobalService, private _HttpClient:HttpClient) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.categoryRoute = this._GlobalService.categoryRoute;
    this.apiKey = this._GlobalService.apiKey
    
  }
  getAll(limit:number=50, page:number=1, sort:string='name', search:string=''):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}${this.categoryRoute}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,{
      headers:{
        'X-API-KEY': this.apiKey
      },
      withCredentials: true
    })
  }
  getOne(categoryId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}${this.categoryRoute}/${categoryId}`,{
      headers:{
        'X-API-KEY': this.apiKey,
      },
      withCredentials: true
    })
  }
  createOne(formData:any){}
  updateOne(categoryId:string, formData:any){}
  deleteOne(categoryId:string){}
}
