import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', title:'Home' ,component: HomeComponent},
  {path:'signup', title: 'SignUp', loadComponent:()=>import('./signup/signup.component').then(m=>m.SignupComponent)},
  {path: 'login', title: 'Login',  loadComponent:()=>import('./login/login.component').then(m=>m.LoginComponent)},
  {path: 'product', title: 'Product', loadComponent:()=>import('./product/product.component').then(m=>m.ProductComponent) },
  {path: 'single', title: 'Product', loadComponent:()=>import('./signal-product/signal-product.component').then(m=>m.SignalProductComponent) }
];
