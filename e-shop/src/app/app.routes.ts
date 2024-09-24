import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', title:'Home' ,component: HomeComponent},
  {path:'signup', title: 'SignUp', component: SignupComponent},
  {path: 'login', title: 'Login', component: LoginComponent},
  {path: 'product', title: 'Product', component: ProductComponent}
];
