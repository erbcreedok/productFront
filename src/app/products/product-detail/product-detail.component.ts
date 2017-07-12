import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Product} from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  constructor( private  apiServer: ProductService) { }

  ngOnInit() {
    this.apiServer.getProductById(1).subscribe(
        (product: Product) => this.product = product,
        (error) => console.log(error)
    );
  }

}
