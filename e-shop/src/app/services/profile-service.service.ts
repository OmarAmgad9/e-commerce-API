import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private baseUrl: string = '';
  private usersRoute: string = '';
  userImage: string = '';
  apiKey: string = ``
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient, private _cookieService:CookieService) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.usersRoute = this._GlobalService.userRoute;
    this.apiKey = this._GlobalService.apiKey;
    this.userImage = this._GlobalService.usersImage;
  }

  getUser(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.usersRoute}/me`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  updateUser(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.usersRoute}/updateMe`, formData, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${this._cookieService.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  changeUserPassword(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.usersRoute}/changeMyPassword`, formData, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${this._cookieService.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  deleteUser(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.usersRoute}/deleteMe`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${this._cookieService.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }
}
