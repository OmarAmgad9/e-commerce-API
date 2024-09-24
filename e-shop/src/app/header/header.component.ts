import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  isLogin:boolean = false;
  userName: string = '';
  name:string = ''
  subscription: any;
  constructor(private _AuthService: AuthService){
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
  getUserName(userId:string){
    this.subscription = this._AuthService.getUserName(userId).subscribe({
      next: (res:any) => {
        this.userName = res.data.name;
      },error(err){
        console.log(err)
      }
    })
  }
  logout(){
    this._AuthService.logout();
  }
}
