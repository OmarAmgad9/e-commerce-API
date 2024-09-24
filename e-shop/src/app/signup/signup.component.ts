import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8),Validators.maxLength(50),])
  })
  constructor(private _AuthService:AuthService, private _Route:Router) {
  }
  signup(formData:FormGroup){

    this._AuthService.signup(formData.value).subscribe({
      next:(res)=>{
        localStorage.setItem('user', res.token);
        // console.log(res.token)
        this._Route.navigate(['/home']);
      },
      error:(err)=>{
        // console.log(err);
      }
    })
  }
  ngOnInit(): void {

  }
}
