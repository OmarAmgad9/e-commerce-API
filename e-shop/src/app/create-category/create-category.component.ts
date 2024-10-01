import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CategoryServiceService } from '../services/category-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],

  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {
  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.min(2), Validators.max(50)])
  })

  constructor(private _AuthService: AuthService, private _CategoryService: CategoryServiceService, private _Router:Router) { }

  addCategory(formData: FormGroup) {
    this._CategoryService.createOne(formData.value).subscribe({
      next: (res) => {
        alert('New Category Added');
        this._Router.navigate(['/dashboard/category'])
      },
      error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
  }

}
