import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl: string = 'http://localhost:3400';
  authRoute: string = '/api/v1/auth';
  categoryRoute:string = '/api/v1/categories'
  subCategoryRoute:string = '/api/v1/subcategory'
  productRoute: string = '/api/v1/product';
  userRoute: string = '/api/v1/users'
  productImage: string = `${this.baseUrl}/products/`;
  apiKey: string = 'secret123';
  constructor() { }
}
