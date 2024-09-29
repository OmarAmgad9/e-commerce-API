import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../interface/product';
import { ProductsService } from '../services/products.service';
import { SectionComponent } from "../section/section.component";

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [SectionComponent],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.scss'
})
export class BestSellerComponent implements OnInit, OnDestroy {
  subscription:any = ''
  products: Product[]=[]
  imgDomain: string = ''
  best = 'Best  Seller'
  most='New Arrival'
  productsMost:Product[]=[]
  constructor(private _ProductService:ProductsService){}
  loadProduct(limit:number, page:number, sort:string, search:string ){
    this.subscription = this._ProductService.getAllProducts(limit,page,sort, search).subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error:(err)=>{
      }
    })
  }
  loadProductMost(limit:number, page:number, sort:string, search:string ){
    this.subscription = this._ProductService.getAllProducts(limit,page,sort, search).subscribe({
      next: (res) => {
        this.productsMost = res.data;
      },
      error:(err)=>{
      }
    })
  }
  ngOnInit(): void {
    this.imgDomain = this._ProductService.productImage;
    this.loadProduct(16,1,'-sold','');
    this.loadProductMost(16,1,'-createdAt','');
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
