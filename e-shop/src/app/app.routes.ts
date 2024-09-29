import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', title:'Home' ,component: HomeComponent},
  {path:'signup', title: 'SignUp', loadComponent:()=>import('./signup/signup.component').then(m=>m.SignupComponent)},
  {path: 'login', title: 'Login',  loadComponent:()=>import('./login/login.component').then(m=>m.LoginComponent)},
  {
    path: 'categories',
    children:[
      {path:':id', title: 'Categories', loadComponent: ()=>import('./product/product.component').then(m=>m.ProductComponent)}
    ]
  },
  {
    path: 'product',
    children: [
      { path: '', title: 'Products', loadComponent: () => import('./product/product.component').then(m => m.ProductComponent) },
      { path: ':id', title: 'Product Details', loadComponent: () => import('./signal-product/signal-product.component').then(m => m.SignalProductComponent) },
    ]
  },
  {path:'cart', title:'cart', loadComponent:()=>import('./cart/cart.component').then(m=>m.CartComponent)},
  {path:'myOrders', title: 'Your Order', loadComponent:()=>import('./order/order.component').then(m=>m.OrderComponent)},
  {path:'profile', title: 'Profile', loadComponent:()=>import('./profile/profile.component').then(m=>m.ProfileComponent)},
  {path:'**', redirectTo: 'home', pathMatch:'full'},
];
