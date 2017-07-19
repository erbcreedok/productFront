import {Injectable} from '@angular/core';
import {Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Product} from '../products/product.model';

@Injectable()
export class DataStorageService {

    constructor(private http: Http) { }

    getProducts() {
        return this.http.get('http://127.0.0.1:8000/products').map(
            (response: Response): Product[] => {
                return response.json();
            }
        ).catch(
            () => {
                return Observable.throw('Something went wrong');
            }
        );
    }

    getProduct(id: number) {
        return this.http.get('http://127.0.0.1:8000/products/' + id).map(
            (response: Response): Product => {
                return response.json()
            }
        ).catch (
            () => {
                return Observable.throw('Something went wrong');
            }
        )
    }

    addProducts(product: Product) {
        return this.http.post('http://127.0.0.1:8000/products/?', product).map(
            (response: Response): Product => {
                return response.json();
            }
        );
    }

    updateProduct(id: number, product: Product) {
        return this.http.put('http://127.0.0.1:8000/products/?', {id: id, product: product}).map(
            (response: Response): Product => {
                return response.json();
            }
        );
    }

    getProductsByFilters(filters: any) {
        return this.http.post('https://127.0.0.1:8000/products/filters/?', filters).map(
            (response: Response): Product[] => {
                return response.json();
            }
        ).catch (
            () => {
                return Observable.throw('Something went wrong');
            }
        );
    }

}
