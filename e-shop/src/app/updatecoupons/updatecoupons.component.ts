import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CouponsService } from '../services/coupons.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-updatecoupons',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './updatecoupons.component.html',
  styleUrl: './updatecoupons.component.scss'
})
export class UpdatecouponsComponent {
  subscription:any;
  coupons:any;
  couponId:any;
  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.min(2), Validators.max(50)]),
    discount: new FormControl(null, [Validators.required,Validators.min(0), Validators.max(100)]),
    expireTime: new FormControl(null, [Validators.required])
  })

  constructor(private _AuthService: AuthService, private _couponsService: CouponsService, private _Router:Router
    , private _ActivatedRoute:ActivatedRoute
  ) { }
  loadCategory(categoryId: string) {
    this.subscription = this._couponsService.getOne(categoryId).subscribe({
      next: (res) => { this.coupons = res.data },
      error: (err) => { }
    })
  }

  addCategory(formData: FormGroup) {
    this._couponsService.updateOne(this.couponId,formData.value).subscribe({
      next: (res) => {
        alert('New Coupons Added');
        this._Router.navigate(['/dashboard/coupons'])
      },
      error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.couponId = this._ActivatedRoute.snapshot.params['id'];
    this.loadCategory(this.couponId)
  }

}
