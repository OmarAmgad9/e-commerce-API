import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryServiceService } from '../services/category-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {
  categoryId: string = '';
  category: any = {};
  subscription: any;
  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.min(2), Validators.max(50)])
  })

  constructor(private _AuthService: AuthService, private _CategoriesService: CategoryServiceService,
    private _Router: Router, private _ActivatedRoute: ActivatedRoute
  ) { }

  loadCategory(categoryId: string) {
    this.subscription = this._CategoriesService.getOne(categoryId).subscribe({
      next: (res) => { this.category = res.data },
      error: (err) => { }
    })
  }

  updateCategory(categoryId: string, formData: FormGroup) {
    this._CategoriesService.updateOne(categoryId, formData.value).subscribe({
      next: (res) => {
        alert('category updated');
        this._Router.navigate(['/dashboard/category']);
      },
      error: () => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.categoryId = this._ActivatedRoute.snapshot.params['id'];
    this.loadCategory(this.categoryId)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
