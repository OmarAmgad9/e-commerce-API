import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pagination } from '../interface/pagination';
import { AuthService } from '../services/auth.service';
import { CategoryServiceService } from '../services/category-service.service';
import { CouponsService } from '../services/coupons.service';
import { ViewDashboardComponent } from '../view-dashboard/view-dashboard.component';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [RouterLink, CommonModule, ViewDashboardComponent],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit, OnDestroy {
  subscription: any;
  categories: any[] = [];
  length: number = 0;
  pagination: Pagination = {};
  limit: number = 50;
  page: number = 1;
  sort: string = 'name';
  search: string = '';
  constructor(private _AuthService: AuthService, private _couponsService: CouponsService) { }

  loadCategories() {
    this.subscription = this._couponsService.getAll(this.limit, this.page, this.sort, this.search).subscribe({
      next: (res) => {
        this.categories = res.data;
        this.length = res.length;
        this.pagination = res.pagination;
      },
      error: (err) => { }
    })
  }

  deleteCategory(categoryId: string) {
    this._couponsService.deleteOne(categoryId).subscribe({
      next: (res) => {
        this.loadCategories();
        alert('Coupons deleted successfully')
      },
      error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadCategories();
  }

  searchData(search: string) {
    this.search = search;
    this.loadCategories();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
