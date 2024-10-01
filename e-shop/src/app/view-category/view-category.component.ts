import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CategoryServiceService } from '../services/category-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ViewDashboardComponent } from "../view-dashboard/view-dashboard.component";
import { Pagination } from '../interface/pagination';

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [CommonModule, RouterLink, ViewDashboardComponent],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss'
})
export class ViewCategoryComponent implements OnInit, OnDestroy {
  subscription: any;
  categories: any[] = [];
  length: number = 0;
  pagination: Pagination = {};
  limit: number = 50;
  page: number = 1;
  sort: string = 'name';
  search: string = '';
  constructor(private _AuthService: AuthService, private _CategoriesService: CategoryServiceService) { }

  loadCategories() {
    this.subscription = this._CategoriesService.getAll(this.limit, this.page, this.sort, this.search).subscribe({
      next: (res) => {
        this.categories = res.data;
        this.length = res.length;
        this.pagination = res.pagination;
      },
      error: (err) => { }
    })
  }

  deleteCategory(categoryId: string) {
    this._CategoriesService.deleteOne(categoryId).subscribe({
      next: (res) => {
        this.loadCategories();
        alert('category deleted successfully')
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
