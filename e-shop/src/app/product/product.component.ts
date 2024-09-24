import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { error } from 'jquery';
import { Product } from '../interface/product';
import { Pagination } from '../interface/pagination';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  subscription:any;
  products: Product[] = []
  imagDomain:string='';
  pagination:Pagination ={}
  limit:number =20;
  page:number=1;
  sort:string='-createdAt';
  search:string='';
  constructor(private _productService: ProductsService){}

  loadProducts(){
    this.subscription = this._productService.getAllProducts(this.limit,this.page,this.sort,this.search).subscribe({
      next:(value)=> {
        this.products=value.data
      },
      error:(error)=>{}
    })
  }
  ngOnInit(): void {
    this.imagDomain=this._productService.productImage;
    this.loadProducts();
  }
  ngOnDestroy(): void {

  }
}
