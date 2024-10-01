import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CategoryServiceService } from '../services/category-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SubCategoryServiceService } from '../services/sub-category-service.service';

@Component({
  selector: 'app-update-sub-category',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-sub-category.component.html',
  styleUrl: './update-sub-category.component.scss'
})
export class UpdateSubCategoryComponent {
  subcategoryId: string = '';
  categories: any[] = [];
  subcategory: any = {};
  subscription: any;
  categorySubscription: any;
  subcategoryForm = new FormGroup({
    name: new FormControl(null),
    category: new FormControl(null)
  })

  constructor(private _AuthService: AuthService, private _SubcategoriesService: SubCategoryServiceService,
    private _CategoriesService: CategoryServiceService, private _Router: Router, private _ActivatedRoute: ActivatedRoute
  ) { }

  loadSubcategory(subcategoryId: string) {
    this.subscription = this._SubcategoriesService.getOne(subcategoryId).subscribe({
      next: (res) => { this.subcategory = res.data },
      error: (err) => { }
    })
  }

  loadCategories() {
    this.categorySubscription = this._CategoriesService.getAll(200, 1, 'name', '').subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => { }
    })
  }

  updateSubcategory(subcategoryId: string, formData: FormGroup) {
    this._SubcategoriesService.updateOne(subcategoryId, formData.value).subscribe({
      next: (res) => {
        alert('category updated');
        this._Router.navigate(['/dashboard/subcategory']);
      },
      error: () => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.subcategoryId = this._ActivatedRoute.snapshot.params['id'];
    this.loadSubcategory(this.subcategoryId)
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }
}
