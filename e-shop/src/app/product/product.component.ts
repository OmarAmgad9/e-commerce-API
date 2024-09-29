import { ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { error } from 'jquery';
import { Product } from '../interface/product';
import { Pagination } from '../interface/pagination';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
declare var $: any; // Import jQuery for Bootstrap modal

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit,OnDestroy {
  subscription:any;
  subscriptionSearch:any;
  products: Product[] = []
  imagDomain:string='';
  pagination:Pagination ={}
  limit:number =20;
  page:number=1;
  sort:string='-createdAt';
  search:string='';
  catParams:any={}
  filterCategories:string = ''
  isModalOpen = false;
  @Input() querySearch: string='';
  subscriptionCategory: any;
  constructor(private _productService: ProductsService ,private _route: ActivatedRoute, private _cartService: CartServiceService){}

  loadProducts(){
    this.subscription = this._productService.getAllProducts(this.limit,this.page,this.sort,this.search, this.filterCategories).subscribe({
      next:(value)=> {
        this.products=value.data;
        this.pagination = value.pagination
      },
      error:(error)=>{}
    })
  }

  ngOnInit(): void {
    this.imagDomain=this._productService.productImage;

    this.subscriptionSearch = this._route.queryParams.subscribe(params=>{
      this.querySearch=params['q'];
      if(this.querySearch){
        this.searchData(this.querySearch)
      }
      this.catParams = this._route.snapshot.params
      if(this.catParams.id){
        console.log(this.catParams.id)
        this.filterUsingCat(this.catParams.id)
      }
      this.loadProducts();
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionSearch.unsubscribe();
  }
  changePage(page:number){
    this.page=page;
    this.loadProducts()
  }
  searchData(search:string){
    this.search = search;
    this.loadProducts();
  }
  filterUsingCat(categoryId:string){
    this.filterCategories = categoryId
    this.loadProducts()
  }
  addToCart(productId:string){
    this._cartService.addCart(productId).subscribe({
      next:(value)=> {
        alert('you Product Add To Cart')
      },
      error(err) {
        console.log(err)
      },
    })
  }
}
