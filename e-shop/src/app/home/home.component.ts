import { Component, OnDestroy, OnInit } from '@angular/core';
import { SectionComponent } from "../section/section.component";
import { BestSellerComponent } from "../best-seller/best-seller.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SectionComponent, BestSellerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {//implements OnInit, OnDestroy{
  parent1:string='Best Seller';
  parent2:string='Top  Rated';

  // loadProducts(){
  //   this
  // }

   productsSet1 = [
    {
      id: 1,
      title: 'Total ',
      price: 'EGP 345.00',
      rating: '4.0',
      image: 'assets/images/product1.jpg'
    },
    {
      id: 2,
      title: 'Ingco HKTS14122 System Set',
      price: 'EGP 359.00',
      rating: '4.2',
      image: 'assets/images/product2.jpg'
    },
    // Add more products
    {
      id: 3,
      title: 'Bosch 14-Piece Ratchet Set Bosch 14-Piece Ratchet Set Bosch 14-Piece Ratchet Sets Bosch 14-Piece Ratchet Set',
      price: 'EGP 782.00',
      rating: '4.8',
      image: 'assets/images/product3.jpg'
    },
    {
      id: 4,
      title: 'Egofine 46 Pieces Socket Set',
      price: 'EGP 449.80',
      rating: '4.9',
      image: 'assets/images/product4.jpg'
    },
    // Add more products
    {
      id: 5,
      title: 'Bosch 14-Piece Ratchet Set Bosch 14-Piece Ratchet Set Bosch 14-Piece Ratchet Sets Bosch 14-Piece Ratchet Set',
      price: 'EGP 782.00',
      rating: '4.8',
      image: 'assets/images/product3.jpg'
    },
    {
      id: 6,
      title: 'Egofine 46 Pieces Socket Set',
      price: 'EGP 449.80',
      rating: '4.9',
      image: 'assets/images/product4.jpg'
    },
    // Add more products
  ];

  // Second set of products
  productsSet2 = [
    {
      id: 1,
      title: 'Bosch 14-Piece Ratchet Set Bosch 14-Piece Ratchet Set Bosch 14-Piece Ratchet Sets Bosch 14-Piece Ratchet Set',
      price: 'EGP 782.00',
      rating: '4.8',
      image: 'assets/images/product3.jpg'
    },
    {
      id: 2,
      title: 'Egofine 46 Pieces Socket Set',
      price: 'EGP 449.80',
      rating: '4.9',
      image: 'assets/images/product4.jpg'
    },
    // Add more products
  ];

}
