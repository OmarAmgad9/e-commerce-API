import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, Input, AfterViewChecked, OnInit, OnChanges } from '@angular/core';

declare var $: any;
// import * as $ from 'jquery';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})


export class SectionComponent implements AfterViewInit{
  @Input() products: any[] = [];
  @Input() title: string = '';
  @Input() id: number = 0;
  @Input() domain: string = ''
  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(function(){
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    })}, 500);
  }

}
