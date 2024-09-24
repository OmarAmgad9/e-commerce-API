
import { Injectable } from '@angular/core';
import { Login, Signup } from '../interface/auth';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from './global.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import {  Router } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = '';
  private authRoute: string = '';
  private apiKey: string = '';
  private userRoute:string = '';
  userName :string = ''
  currentUser = new BehaviorSubject(null)
  constructor(private _HttpClient:HttpClient, private _GlobalService:GlobalService, private _Router:Router ,private cookieService: CookieService) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.authRoute = this._GlobalService.authRoute;
    this.apiKey = this._GlobalService.apiKey;
    this.userRoute = this._GlobalService.userRoute;
    if(localStorage.getItem('user') !== null){
      this.saveCurrentUser()
    }
  }
  getUserName(userId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}${this.userRoute}/${userId}`,
      {
        headers: {
          "X-API-KEY": `${this.apiKey}`
        },
        withCredentials: true
      }
    )
  }
  saveCurrentUser(){
    const token = localStorage.getItem('user');
    if(token){
      const decoded:any = jwtDecode(token);
      return  this.currentUser.next(decoded)
    }
  }
  checkToken(){
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout()
    }
  }
  signup(formData: Signup):Observable<any>{ // request api
    return this._HttpClient.post(`${this.baseUrl}${this.authRoute}/signup`, formData,
      {
        headers:{
          "X-API-KEY": `${this.apiKey}`,
          "X-CSRF-Token": `${this.cookieService.get('cookies')}`
        },
        withCredentials:true
      }
    )
  }
  login(formData:Login):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}${this.authRoute}/login`, formData,
      {
        headers:{
          "X-API-KEY": `${this.apiKey}`,
          "X-CSRF-Token": `${this.cookieService.get('cookies')}`
        }
      }
    )
  }
  logout(){
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this._Router.navigate(['/home'])
  }
}







// signup => post = name , email, phone , password, confirmPassword
// login => post = email, password if valid return storage api in localStorage
