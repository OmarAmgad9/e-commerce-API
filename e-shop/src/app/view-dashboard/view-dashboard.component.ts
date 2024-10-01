import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../interface/product';
import { Pagination } from '../interface/pagination';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { CategoryServiceService } from '../services/category-service.service';
import { SubCategoryServiceService } from '../services/sub-category-service.service';

@Component({
  selector: 'app-view-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-dashboard.component.html',
  styleUrl: './view-dashboard.component.scss'
})
export class ViewDashboardComponent{
  constructor(){}
}
