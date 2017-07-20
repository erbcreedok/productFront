import { Component, OnInit } from '@angular/core';
import {ErrorHandleService} from '../shared/error-handle.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  errors: {header: string, body: string};

  constructor(private  errorHandleService: ErrorHandleService) { }

  ngOnInit() {
  }
}
