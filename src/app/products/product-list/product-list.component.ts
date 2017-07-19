import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product.model';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  productColumns: {name: string, title: string}[];

  orderBy = '';
  orderInverse = false;

  isFilterOpen = true;


  constructor( private productService: ProductService) { }

  ngOnInit() {
      this.products = this.productService.getProducts();
      this.productColumns = this.productService.getProductColumns();
      this.orderBy = this.productColumns[0].name;
      this.productService.productsEdited.subscribe(
          (products: Product[]) => {
            this.products = products;
          }
      );
  }

  isOrderedBy(columnName: string) {
    return this.orderBy === columnName ? 'active' + (this.orderInverse ? ' reverse' : '') : '';
  }

  onSorted(columnName: string) {
    if (this.orderBy === columnName) {
      this.orderInverse = !this.orderInverse;
    } else {
      this.orderBy = columnName;
      this.orderInverse = false;
    }
  }
}
