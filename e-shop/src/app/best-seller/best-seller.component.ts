import { Component, OnInit } from '@angular/core';
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
export class BestSellerComponent implements OnInit {
  subscription:any = ''
  products: Product[]=[]
  imgDomain: string = ''
  best = 'Best  Seller'
  constructor(private _ProductService:ProductsService){}
  loadProduct(){
    this.subscription = this._ProductService.getAllProducts(16,1,'-sold', '').subscribe({
      next: (res) => {
        this.products = res.data;
        console.log(this.products)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  ngOnInit(): void {
    this.imgDomain = this._ProductService.productImage;
    console.log(this.imgDomain)
    this.loadProduct();
  }

}
