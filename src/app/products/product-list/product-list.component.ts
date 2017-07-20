import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product.model';
import {Subscription} from "rxjs/Subscription";

interface ProductColumn {
    name: string,
    title: string,
    type: string,
    property: string
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  productColumns: ProductColumn[];
  productSubscription: Subscription;

  isFilterOpen = false;


  constructor( private productService: ProductService ) { }

  ngOnInit() {
      this.products = this.productService.getProducts();
      this.productColumns = this.productService.getProductColumns();
      this.productService.order.sort = this.productColumns[0].name;
      this.productSubscription = this.productService.productsEdited.subscribe(
          (products: Product[]) => {
            this.products = products;
          }
      );
  }
  ngOnDestroy() {
      this.productSubscription.unsubscribe();
  }

  isOrderedBy(columnName: ProductColumn) {
    return this.productService.order.sort === columnName.name ? 'active' + (this.productService.order.order ? ' ' : ' reverse') : '';
  }

  onSorted(columnName: ProductColumn) {
    if (this.productService.order.sort === columnName.name) {
      this.productService.order.order = !this.productService.order.order;
    } else {
      this.productService.order.sort = columnName.property;
      this.productService.order.order = false;
    }
    this.productService.getProductsByOptions();
  }

  loadProducts() {
      this.productService.loadProducts();
  }
}
