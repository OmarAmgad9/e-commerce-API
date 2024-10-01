import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { SubCategoryServiceService } from '../services/sub-category-service.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from '../services/category-service.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  subscription:any;
  subcategories: any[] = [];
  productId:string=''
  productName: string = '';
  productDescription: string = '';
  productCategory: string = '';
  productSubcategory: string = '';
  productPrice: string = '0';
  productQuantity: string = '0';
  productCover: any;
  productImages: any;
  product:any;
  subcatSubscription:any;
  catSubscription:any;
  getCover(event: any) {
    const cover = event.target.files[0];
    if (cover) {
      this.productCover = cover;
    }
  }

  getImages(event: any) {
    const images = event.target.files;
    if (images) {
      this.productImages = images;
    }
  }
  // ---------

  constructor(private _AuthService: AuthService, private _ProductsService: ProductsService,
    private _CategoriesService: CategoryServiceService, private _SubcategoriesService: SubCategoryServiceService,
    private _Router: Router, private _ActivatedRoute:ActivatedRoute) { }

  loadCategories() {
    this.catSubscription =this._CategoriesService.getAll(200, 1, 'name', '').subscribe({
      next: (res) => { this.categories = res.data },
      error: (err) => { }
    })
  }

  loadSubcategories(categoryId: string) {
    this.productCategory = categoryId;
    this.subcatSubscription = this._SubcategoriesService.getAllFilter(categoryId).subscribe({
      next: (res) => { this.subcategories = res.data },
      error: (err) => { }
    })
  }
  loadProduct(productId:string){
    this.subscription = this._ProductsService.getProduct(productId).subscribe({
      next: (res) => {
        this.product =  res.data;
      },
      error:(err)=>{}
    })
  }

  updateProduct(productId:string) {
    const formData = new FormData();
    formData.append('name', this.productName);
    formData.append('description', this.productDescription);
    formData.append('category', this.productCategory);
    formData.append('subcategory', this.productSubcategory);
    formData.append('quantity', this.productQuantity);
    formData.append('price', this.productPrice);
    if (this.productCover) {
      formData.append('cover', this.productCover);
    };
    if (this.productImages) {
      for (let i = 0; i < this.productImages.length; i++) {
        formData.append('images', this.productImages[i]);
      }
      console.log(formData.get('images'));
    };
    this._ProductsService.updateOne(productId,formData).subscribe({
      next: (res) => {
        alert('product added');
        this._Router.navigate(['/dashboard/product']);
      },

    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loadCategories();
    this.productId = this._ActivatedRoute.snapshot.params['id'];
    this.loadProduct(this.productId);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subcatSubscription.unsubscribe();
    this.catSubscription.unsubscribe()
  }
}
