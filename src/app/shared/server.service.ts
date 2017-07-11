import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Product} from "../products/product.model";


@Injectable()
export class ServerService {

  constructor(private http: Http) { }

  getProductsList() {
    return this.http.get('http://127.0.0.1:8000/products').map
    (
        (response: Response) => {
          const products = response.json()
          return products;
        }
    ).catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
    );
  }
}
