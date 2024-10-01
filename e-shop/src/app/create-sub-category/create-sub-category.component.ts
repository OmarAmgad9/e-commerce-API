import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SubCategoryServiceService } from '../services/sub-category-service.service';
import { Router, RouterLink } from '@angular/router';
import { CategoryServiceService } from '../services/category-service.service';

@Component({
  selector: 'app-create-sub-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './create-sub-category.component.html',
  styleUrl: './create-sub-category.component.scss'
})
export class CreateSubCategoryComponent {
  subscription: any;
  categories: any[] = [];
  subcategoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.min(2), Validators.max(50)]),
    category: new FormControl(null, [Validators.required]),
  })

  constructor(private _AuthService: AuthService, private _SubcategoriesService: SubCategoryServiceService,
    private _CategoriesService: CategoryServiceService, private _Router: Router) { }

  addSubcategory(formData: FormGroup) {
    this._SubcategoriesService.createOne(formData.value).subscribe({
      next: (res) => {
        alert('New Category Added');
        this._Router.navigate(['/dashboard/subcategory'])
      },
      error: (err) => { }
    })
  }

  loadCategories() {
    this.subscription = this._CategoriesService.getAll(200, 1, 'name', '').subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loadCategories();
  }
}
