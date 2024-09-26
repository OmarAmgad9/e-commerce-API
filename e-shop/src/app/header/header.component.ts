import { Component, OnInit, Query } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  formSearch = new FormGroup({
    search: new FormControl(null, [Validators.required])
  })
  isLogin:boolean = false;
  userName: string = '';
  name:string = ''
  subscription: any;
  constructor(private _AuthService: AuthService, private router:Router){
    this._AuthService.currentUser.subscribe({
      next: () => {
        if(this._AuthService.currentUser.getValue() !== null){
          const test:any = this._AuthService.currentUser.getValue()
          console.log(test._id)
          this.getUserName(test._id);

          this.isLogin = true;
        }else{
          this.isLogin = false;
        }
      },
      error(err) {
        console.log(err)
      },
    })
  }
  searchMethod(searchData:FormGroup){
  this.router.navigate(['/product'], { queryParams: { q: searchData.value.search } })
  }
  getUserName(userId:string){
    this.subscription = this._AuthService.getUserName(userId).subscribe({
      next: (res:any) => {
        this.userName = res.data.name;
      },error(err){
      }
    })
  }
  logout(){
    this._AuthService.logout();
  }

}
