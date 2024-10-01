import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViewDashboardComponent } from '../view-dashboard/view-dashboard.component';
import { AuthService } from '../services/auth.service';
import { CouponsService } from '../services/coupons.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-coupons',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ViewDashboardComponent, RouterLink],
  templateUrl: './create-coupons.component.html',
  styleUrl: './create-coupons.component.scss'
})
export class CreateCouponsComponent
{
  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.min(2), Validators.max(50)]),
    discount: new FormControl(null, [Validators.required,Validators.min(0), Validators.max(100)]),
    expireTime: new FormControl(null, [Validators.required])
  })

  constructor(private _AuthService: AuthService, private _couponsService: CouponsService, private _Router:Router) { }

  addCategory(formData: FormGroup) {
    this._couponsService.createOne(formData.value).subscribe({
      next: (res) => {
        alert('New Coupons Added');
        this._Router.navigate(['/dashboard/coupons'])
      },
      error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
  }

}
