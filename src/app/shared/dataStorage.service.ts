import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Product} from '../products/product.model';

@Injectable()
export class DataStorageService {

    constructor(private http: Http) { }

    getProducts() {
        return this.http.get('http://127.0.0.1:8000/products').map
        (
            (response: Response) => {
                const products: Product[] = response.json();
                return products;
            }
        ).catch(
            () => {
                return Observable.throw('Something went wrong');
            }
        );
    }
    getProduct(id: number) {
        return this.http.get('http://127.0.0.1:8000/products/' + id).map(
            (response: Response) => {
                const product: Product = response.json()
                return product;
            }
        ).catch (
            () => {
                return Observable.throw('Something went wronп');
            }
        )
    }

}
