import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/product.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[];
  constructor( private serverService: ProductService) { }

  ngOnInit() {
      this.serverService.getProductsList().subscribe(
          (products: any[]) => this.products = products,
          (error) => console.log(error)
      );
  }





}
