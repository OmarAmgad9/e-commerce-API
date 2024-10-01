import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SubCategoryServiceService } from '../services/sub-category-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ViewDashboardComponent } from "../view-dashboard/view-dashboard.component";

@Component({
  selector: 'app-view-sub-category',
  standalone: true,
  imports: [CommonModule, RouterLink, ViewDashboardComponent],
  templateUrl: './view-sub-category.component.html',
  styleUrl: './view-sub-category.component.scss'
})
export class ViewSubCategoryComponent implements OnInit, OnDestroy{
  subscription: any;
  subcategories: any[] = [];
  length: number = 0;
  pagination: any = {};
  limit: number = 50;
  page: number = 1;
  sort: string = 'category name';
  search: string = '';
  constructor(private _AuthService: AuthService, private _SubcategoriesService: SubCategoryServiceService) { }

  loadSubcategories() {
    this.subscription = this._SubcategoriesService.getAll(this.limit, this.page, this.sort, this.search).subscribe({
      next: (res) => {
        this.subcategories = res.data;
        this.length = res.length;
        this.pagination = res.pagination;
      },
      error: (err) => {

      }
    })
  }

  deleteSubcategory(categoryId: string) {
    this._SubcategoriesService.deleteOne(categoryId).subscribe({
      next: (res) => {
        this.loadSubcategories();
        alert('Subcategory deleted successfully')
      },
      error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadSubcategories();
  }

  searchData(search: string) {
    this.search = search;
    this.loadSubcategories();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loadSubcategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
