import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit{
  ForgetPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  })
  constructor(private _AuthService: AuthService, private _Route:Router){}
  ForgetPassword(formData:FormGroup){
    this._AuthService.ForgetPassword(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', res.resetToken);

        this._Route.navigate(['/verifyCode']);
      },
      error(err){
        console.log(err)
      }
    })
  }

  ngOnInit(): void {

  }
}
