import {Injectable} from '@angular/core';
import {Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Product} from '../products/product.model';
import {ErrorHandleService} from './error-handle.service';
import {ErrorMessage} from './error-message.model';

@Injectable()
export class DataStorageService {

    backEndUrl = 'http://127.0.0.1:8000/';

    constructor(private http: Http, private errorHandleService: ErrorHandleService) { }

    getProducts() {
        const url = this.backEndUrl + 'products';
        return this.http.get(url).map(
            (response: Response): Product[] => {
                const products: Product[] = response.json();
                for (const product of products) {
                    this.prepareProduct(product);
                }
                return products;
            }
        ).catch(
            (error: Response) => {
                this.errorHandleService.addError(new ErrorMessage(
                    'Connection Failed',
                    'Oops... Looks like "' + url + '" is unreachable...',
                    error
                ));
                return Observable.throw(error);
            }
        );
    }

    getProduct(id: number) {
        const url = this.backEndUrl + 'products/' + id;
        return this.http.get(url).map(
            (response: Response): Product => {
                const product = response.json();
                if (product) {
                    this.prepareProduct(product);
                }
                return product;
            }
        ).catch (
            (error: Response) => {
                this.errorHandleService.addError(new ErrorMessage(
                    'Connection Failed',
                    'Oops... Looks like "' + url + '" is unreachable...',
                    error
                ));
                return Observable.throw(error);
            }
        )
    }

    addProducts(product: Product) {
        return this.http.post('http://127.0.0.1:8000/products/?', {'product': product}).map(
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

    getProductsByOptions(order: any, limit: any, filters: any) {
        const url = this.backEndUrl + 'products/get/?';
        return this.http.post(url, {order: order, limit: limit, filters: filters}).map(
            (response: Response): Product[] => {
                const products: Product[] = response.json();
                for (const product of products) {
                    this.prepareProduct(product);
                }
                return products;
            }
        ).catch(
            (error: Response) => {
                this.errorHandleService.addError(new ErrorMessage(
                    'Connection Failed',
                    'Oops... Looks like "' + url + '" is unreachable...',
                    error
                ));
                return Observable.throw(error);
            }
        );
    }

    prepareProduct(product: Product): Product {
        product.dateAdded = new Date(product.dateAdded);
        product.discontinued = product.discontinued ? new Date(product.discontinued) : null;
        return product;
    }

}
