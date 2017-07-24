import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product.model';
import {Subscription} from 'rxjs/Subscription';
import _ from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';

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
  orderBy = '';
  orderInverse = false;

  activePage = 1;
  pages: number[];
  lastPage = 1;

  constructor( private productService: ProductService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
      this.products = this.productService.getProducts();
      this.productColumns = this.productService.getProductColumns();
      this.route.queryParams.subscribe(
          (data) => {
              if (data['order']) {
                  this.productService.order = data['order'];
              }
              this.orderBy = this.productColumns.find(x => x.property === this.productService.order.sort).name;

              if (data['page']) {
                  this.activePage = +data['page'];
                  if (this.activePage < 1 || this.activePage > this.lastPage) {
                      this.router.navigate(['/not-found']);
                  } else if (this.activePage === 1){
                      this.router.navigate(['/products']);
                  }
              } else {
                  this.activePage = 1;
              }
              this.lastPage = this.productService.getProductPagesCount();
              this.pages = this.getPages();
              this.productService.limit.offset = (this.activePage - 1) * this.productService.limit.limit;

              this.loadProducts();
          }
      );
      this.productSubscription = this.productService.productsEdited.subscribe(
          (products: Product[]) => {
              this.products = products;
              this.lastPage = this.productService.getProductPagesCount();
              this.pages = this.getPages();
          }
      );
  }
  ngOnDestroy() {
      this.productSubscription.unsubscribe();
  }

  isOrderedBy(columnName: ProductColumn) {
    return this.orderBy === columnName.name ? 'active' + (this.orderInverse ? ' reverse' : '') : '';
  }

  onSorted(columnName: ProductColumn) {
    if (this.productService.order.sort === columnName.property) {
      this.productService.order.order = !this.productService.order.order;
      this.orderInverse = !this.productService.order.order;
    } else {
      this.productService.order.sort = columnName.property;
      this.orderBy = columnName.name;
      this.productService.order.order = true;
      this.orderInverse = !this.productService.order.order;
    }
    this.productService.loadProducts();
  }

  loadProducts() {
      this.productService.loadProducts();
  }


  goToPage(page: number) {
      this.router.navigate(['/products'], {relativeTo: this.route, queryParams: {page: page}});
  }
  getPages() {
      const pageLimits = 5;
      let startPage: number, endPage: number;
      if (this.lastPage <= pageLimits) {
          startPage = 1;
          endPage = this.lastPage;
      } else {
          if ( this.activePage <= Math.ceil(pageLimits / 2)) {
              startPage = 1;
              endPage = pageLimits;
          } else if (this.activePage + Math.ceil(pageLimits / 2) >= this.lastPage) {
              startPage = this.lastPage - pageLimits + 1;
              endPage = this.lastPage;
          } else {
              startPage = this.activePage - Math.ceil(pageLimits / 2);
              endPage = this.activePage + pageLimits - 1;
          }
      }
      return _.range(startPage, endPage + 1);
  }
}
