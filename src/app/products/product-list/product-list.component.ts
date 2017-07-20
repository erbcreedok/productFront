import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product.model';
import {Subscription} from "rxjs/Subscription";



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  productColumns: {name: string, title: string}[];
  productSubscription: Subscription;

  orderBy = '';
  orderInverse = false;

  isFilterOpen = false;


  constructor( private productService: ProductService ) { }

  ngOnInit() {
      this.products = this.productService.getProducts();
      this.productColumns = this.productService.getProductColumns();
      this.orderBy = this.productColumns[0].name;
      this.productSubscription = this.productService.productsEdited.subscribe(
          (products: Product[]) => {
            this.products = products;
          }
      );
  }
  ngOnDestroy() {
      this.productSubscription.unsubscribe();
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

  loadProducts() {
      this.productService.loadProducts();
  }
}
