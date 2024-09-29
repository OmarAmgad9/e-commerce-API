import { Component, OnDestroy, OnInit } from '@angular/core';
import { Categories } from '../interface/categories';
import { CategoryServiceService } from '../services/category-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.scss'
})
export class CategorySectionComponent implements  OnInit, OnDestroy {

  categories:Categories[]=[];
  subscription:any;
  sort:string='-createdAt'

  constructor(private _categoriesService:CategoryServiceService){}

  loadCategories(){
    this.subscription = this._categoriesService.getAll(8).subscribe({
      next:(value)=> {
        this.categories = value.data
      },
      error:(err)=> {
      },
    })
  }

  ngOnInit():void{
    this.loadCategories()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
