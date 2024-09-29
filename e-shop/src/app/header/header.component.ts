import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  formSearch = new FormGroup({
    search: new FormControl(null, [Validators.required])
  })
  isLogin:boolean = false;
  userName: string = '';
  name:string = '';
  authSubscription:any;
  subscription: any;
  length:number = 0;
  sub:any;
  constructor(private _AuthService: AuthService, private router:Router, private _cartService:CartServiceService){
  }

  ngOnInit(): void {
    this.authSubscription = this._AuthService.currentUser.subscribe({
      next: () => {
        if(this._AuthService.currentUser.getValue() !== null){
          const test:any = this._AuthService.currentUser.getValue()
          this.getUserName(test._id);
          this.isLogin = true;
        }else{
          this.isLogin = false;
        }
      },
      error(err) {
        console.log(err)
      },
    });
    this.getLengthOfCart()
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
  getLengthOfCart(){
    this.sub = this._cartService.getCart().subscribe({
      next: (res) => {
        this.length = res.length
      },
      error:(err)=> {
      },
    })
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

}
