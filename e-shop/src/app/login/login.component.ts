import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {  Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)])
  })
  constructor(private _AuthService: AuthService, private _Route:Router){}
  login(formData:FormGroup){
    this._AuthService.login(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', res.token);

        this._Route.navigate(['/home']);
      },
      error(err){
      }
    })
  }

  ngOnInit(): void {

  }
}
