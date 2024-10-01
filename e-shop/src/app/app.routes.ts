import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guard/auth.guard';
import { dashboardAuthGuard } from './guard/dashboard-auth.guard';
import { adminGuardGuard } from './guard/admin-guard.guard';

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
    path: 'subCategories',
    children:[
      {path:':subId', title: 'SubCategory', loadComponent: ()=>import('./product/product.component').then(m=>m.ProductComponent)}
    ]
  },
  {
    path: 'product',
    children: [
      { path: '', title: 'Products', loadComponent: () => import('./product/product.component').then(m => m.ProductComponent) },
      { path: ':id', title: 'Product Details', loadComponent: () => import('./signal-product/signal-product.component').then(m => m.SignalProductComponent) },
    ]
  },
  {path:'cart', title:'cart',canActivate:[authGuard] ,loadComponent:()=>import('./cart/cart.component').then(m=>m.CartComponent)},
  {path:'myOrders', title: 'Your Order',canActivate:[authGuard] ,loadComponent:()=>import('./order/order.component').then(m=>m.OrderComponent)},
  {path:'profile', title: 'Profile',canActivate:[authGuard] ,loadComponent:()=>import('./profile/profile.component').then(m=>m.ProfileComponent)},


  // Dashboard Section

  {
    path:'dashboard',
    canActivate:[adminGuardGuard],
    children: [
      {path:'', title:'Dashboard', loadComponent:()=>import('./view-dashboard/view-dashboard.component').then(m=>m.ViewDashboardComponent)},
      {
        path:'category',
        children:[
        {path:'', title:'Dashboard Category', loadComponent:()=>import('./view-category/view-category.component').then(m=>m.ViewCategoryComponent)},
        {path:'create', title:'Create Category', loadComponent:()=>import('./create-category/create-category.component').then(m=>m.CreateCategoryComponent)},
        {path:':id/update', title:'Update Category', loadComponent:()=>import('./update-category/update-category.component').then(m=>m.UpdateCategoryComponent)},
      ]
      },
      {
        path:'subcategory',
        children:[
          {path:'', title:'Dashboard subCategory', loadComponent:()=>import('./view-sub-category/view-sub-category.component').then(m=>m.ViewSubCategoryComponent)},
          {path:'create', title:'Create subCategory', loadComponent:()=>import('./create-sub-category/create-sub-category.component').then(m=>m.CreateSubCategoryComponent)},
          {path:':id/update', title:'Update subCategory', loadComponent:()=>import('./update-sub-category/update-sub-category.component').then(m=>m.UpdateSubCategoryComponent)}
        ]
      },
      {
        path:'product',
        children:[
          {path:'', title:'Dashboard Product', loadComponent:()=>import('./view-product/view-product.component').then(m=>m.ViewProductComponent)},
          {path:'create', title:'Create Product', loadComponent:()=>import('./create-product/create-product.component').then(m=>m.CreateProductComponent)},
          {path:':id/update', title:'update Product', loadComponent:()=>import('./update-product/update-product.component').then(m=>m.UpdateProductComponent)},
        ]
      },
      {path:'users', title:'Dashboard users', canActivate:[dashboardAuthGuard] ,loadComponent:()=>import('./view-users/view-users.component').then(m=>m.ViewUsersComponent)},

    ]

  },

  // end Dashboard
  {path:'**', title:'Not Found', loadComponent:()=>import('./not-found/not-found.component').then(m=>m.NotFoundComponent)}
];
