import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Product} from '../../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() index: number;
  @Input() columns: {name: string, title: string, type: string};

  constructor() {
  }

  ngOnInit() {
  }

}
