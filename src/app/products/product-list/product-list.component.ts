import { Component, OnInit } from '@angular/core';
import {Response} from "@angular/http";
import {ServerService} from "../../shared/server.service";
import {Product} from "../product.model";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[];
  constructor( private serverService: ServerService) { }

  ngOnInit() {
      this.serverService.getProductsList().subscribe(
          (products: any[]) => this.products = products,
          (error) => console.log(error)
      );
  }





}
