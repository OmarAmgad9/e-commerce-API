import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent implements OnInit{
  ForgetPasswordForm = new FormGroup({
    email: new FormControl(null, [ Validators.required]),
  })
  constructor(private _AuthService: AuthService, private _Route:Router){}
  ForgetPassword(formData:FormGroup){
    this._AuthService.verifyCode(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', res.resetToken);

        this._Route.navigate(['/restCode']);
      },
      error(err){
      }
    })
  }

  ngOnInit(): void {

  }
}
