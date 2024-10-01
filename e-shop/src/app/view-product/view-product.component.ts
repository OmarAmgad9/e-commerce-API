import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../interface/product';
import { ViewDashboardComponent } from "../view-dashboard/view-dashboard.component";

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule, RouterLink, ViewDashboardComponent],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent implements OnInit, OnDestroy {
  products: any[] = [];
  subscription: any;
  limit: number = 15;
  page: number = 1;
  sort: string = 'category subcategory name';
  search: string = '';
  pagination: any = {};
  productImage: string = '';
  constructor(private _AuthService: AuthService, private _ProductsService: ProductsService) { }

  loadProducts() {
    this.subscription = this._ProductsService.getAllProducts(this.limit, this.page, this.sort, this.search).subscribe({
      next: (res) => {
        this.products = res.data
        this.pagination = res.pagination
      },
      error: (err) => { }
    })
  }

  deleteProduct(productId: string) {
    this._ProductsService.deleteOne(productId).subscribe({
      next: (res) => {
        this.loadProducts();
        alert('product deleted');
      },
      error: (err) => { }
    })
  }

  searchData(search: string) {
    this.search = search;
    this.loadProducts();
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._ProductsService.productImage;
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
