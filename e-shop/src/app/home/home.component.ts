import { Component, OnDestroy, OnInit } from '@angular/core';
import { SectionComponent } from "../section/section.component";
import { BestSellerComponent } from "../best-seller/best-seller.component";
import { CategoryServiceService } from '../services/category-service.service';
import { CategorySectionComponent } from "../category-section/category-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SectionComponent, BestSellerComponent, CategorySectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {//implements OnInit, OnDestroy{
  parent1:string='Best Seller';
  parent2:string='Top  Rated';

}

