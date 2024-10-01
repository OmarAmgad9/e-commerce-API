import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-rest-code',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './rest-code.component.html',
  styleUrl: './rest-code.component.scss'
})
export class RestCodeComponent implements OnInit{
  restCodeForm = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)])
  })
  constructor(private _AuthService: AuthService, private _Route:Router){}
  ForgetPassword(formData:FormGroup){
    this._AuthService.restCode(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', res.resetToken);

        this._Route.navigate(['/home']);
      },
      error(err){
        console.log(err)
      }
    })

  }

  ngOnInit(): void {

  }
}
