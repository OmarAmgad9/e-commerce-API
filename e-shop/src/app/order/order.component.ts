import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Pagination } from '../interface/pagination';
import { OrderServiceService } from '../services/order-service.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit, OnDestroy{
  subscription: any;
  orders: any[] = [];
  productImage: string = '';
  search: string = '';
  page: number = 1;
  pagination: Pagination = {};
  constructor(private _AuthService: AuthService, private _OrdersService: OrderServiceService) { };

  loadOrders() {
    this.subscription = this._OrdersService.getOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        this.pagination = res.pagination;
      },
      error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadOrders();
  }

  searchProducts(search: string) {
    this.search = search;
    this.loadOrders();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._OrdersService.productImage;
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
