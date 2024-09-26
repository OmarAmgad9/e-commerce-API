import { ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { error } from 'jquery';
import { Product } from '../interface/product';
import { Pagination } from '../interface/pagination';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit,OnDestroy {
  subscription:any;
  products: Product[] = []
  imagDomain:string='';
  pagination:Pagination ={}
  limit:number =20;
  page:number=1;
  sort:string='-createdAt';
  search:string='';
  @Input() querySearch: string='';
  constructor(private _productService: ProductsService, private _route: ActivatedRoute, private cdf: ChangeDetectorRef){}

  loadProducts(){
    this.subscription = this._productService.getAllProducts(this.limit,this.page,this.sort,this.search).subscribe({
      next:(value)=> {
        this.products=value.data;
        this.pagination = value.pagination
      },
      error:(error)=>{}
    })
  }
  ngOnInit(): void {
    this.imagDomain=this._productService.productImage;
    this.loadProducts();
    this._route.queryParams.subscribe(params=>{
      this.querySearch=params['q'];
      this.searchData(this.querySearch)
    })
  }

  ngOnDestroy(): void {
  }
  changePage(page:number){
    this.page=page;
    this.loadProducts()
  }
  searchData(search:string){
    this.search = search;
    this.loadProducts();
  }
}
