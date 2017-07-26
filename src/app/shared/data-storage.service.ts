import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Product} from '../products/product.model';
import {ErrorHandleService} from './error-handle.service';
import {ErrorMessage} from './error-message.model';
import preventExtensions = Reflect.preventExtensions;

@Injectable()
export class DataStorageService {

    backEndUrl = 'http://127.0.0.1:8000/';

    constructor(private http: Http, private errorHandleService: ErrorHandleService) { }

    getProductsCount(filters: any = null) {
        const url = this.backEndUrl + 'products/count/';
        return this.http.get(url, {search: {'filters': filters}}).map(
            (response: Response): number => {
                return response.json();
            }
        );
    }

    getProducts(limit: any = null, order: any = null, filters: any = null) {
        const url = this.backEndUrl + 'products';
        return this.http.get(url, {search: {'filters': filters, 'order': order, 'limit': limit}}).map(
            (response: Response): {products: Product[], count: number} => {
                const data = response.json();
                const products: Product[] = data['products'];
                const count: number = data['count'];
                for (const product of products) {
                    this.prepareProduct(product);
                }
                return {products: products, count: count};
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
        );
    }

    addProducts(product: Product) {
        const url = this.backEndUrl + 'products/?';
        return this.http.post(url, {'product': product}).map(
            (response: Response): Product => {
                const data = response.json();
                if (data) {
                    this.prepareProduct(data);
                }
                return data;
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
        );
    }

    updateProduct(id: number, product: Product) {
        const url = this.backEndUrl + 'products/' + id;
        return this.http.put(url, {product: product}).map(
            (response: Response): Product => {
                const data = response.json();
                if (data) {
                    this.prepareProduct(data);
                }
                return data;
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
        );
    }

    deleteProduct(id: number) {
        const url = this.backEndUrl + 'products/' + id;
        return this.http.delete(url).map(
            (response: Response) => {
                return response.json();
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
        );
    }

    prepareProduct(product: Product): Product {
        product.dateAdded = new Date(product.dateAdded);
        product.discontinued = product.discontinued ? new Date(product.discontinued) : null;
        return product;
    }

    isProductCodeFree(productCode: string) {
        const url = this.backEndUrl + 'products/isProductCodeFree/';
        return this.http.get(url, {search: {productCode: productCode}}).map(
            (response: Response): number => response.json()
        ).catch (
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

}
