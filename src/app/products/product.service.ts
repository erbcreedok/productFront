import {Injectable, OnInit} from '@angular/core';
import 'rxjs/Rx';
import {Product} from './product.model';
import {DataStorageService} from '../shared/data-storage.service';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class ProductService {
    private products: Product[] = [
        new Product(
            1,
            'P0001',
            'DVD Player',
            'Nice DVD Player',
            10,
            29.00,
            null,
            new Date()
        ),
        new Product(
            2,
            'P0002',
            'SONY PSP',
            'Portable PlayStation 2008',
            15,
            69.45,
            null,
            new Date(new Date().getTime() - 9000000)
        ),
        new Product(
            3,
            'P0003',
            'MacBook Pro',
            'Nice notebook from Apple',
            42,
            1599.99,
            new Date(Date.now()),
            new Date()
        ),
        new Product(
            4,
            'P0004',
            'DVD Reader',
            'Nice DVD Player',
            0,
            29.50,
            new Date(new Date().getTime() - 1000000),
            new Date(new Date().getTime() - 20000)
        ),
        new Product(
            5,
            'P0005',
            'SONY PlayStation 4',
            'PlayStation 4, 2015. Made in Japan',
            15,
            69.45,
            null,
            new Date()
        ),
        new Product(
            6,
            'P0006',
            'MacBook Air',
            'Nice and tiny notebook from Apple',
            42,
            1599.99,
            new Date(new Date().getTime() - 150000),
            new Date(new Date().getTime() - 3000000)
        )
    ];

    productsEdited = new Subject<Product[]> ();
    productLoaded = new Subject<Product>();

    subscription: Subscription;

    order = {
        sort: 'id',
        order: true
    };

    limit = {
        offset: 0,
        limit: 20
    };

    filters = null;

    constructor(private dataStorageService: DataStorageService) {
        // this.loadProducts();
    }

    isLoading() {
        console.log(this.subscription);
        console.log(this.subscription && !this.subscription.closed);
        return (this.subscription && !this.subscription.closed);
    }

    loadProducts() {
        if (this.isLoading()) {
            return;
        }
        this.subscription = this.dataStorageService.getProducts().subscribe(
            (products: Product[]) => {
                this.products = products;
                this.productsEdited.next(this.products.slice());
            }
        );
    }

    loadProduct(id: number) {
        if (this.isLoading()) {
            return;
        }
        this.subscription = this.dataStorageService.getProduct(id).subscribe(
            (product: Product) => {
                this.productLoaded.next(product);
            }
        );
    }

    getProductColumns() {
        return Product.columns;
    }

    getProducts(): Product[] {
        return this.products.slice();
    }

    getProduct(id: number): Product {
        return this.products.find( (product: Product) => product.id === id);
    }

    getProductsByOptions() {
        if (this.isLoading()) {
            return;
        }
        this.subscription = this.dataStorageService.getProducts(this.order, this.limit, this.filters).subscribe(
            (products: Product[]) => {
                this.products = products;
                this.productsEdited.next(this.products.slice());
            }
        );
    }

    getProductsByFilters(filters: any) {
        if (this.isLoading()) {
            return;
        }
        this.filters = filters;
        this.getProductsByOptions();
    }

    addProduct(product: Product) {
        if (this.isLoading()) {
            return;
        }
        this.subscription = this.dataStorageService.addProducts(product).subscribe(
            (newProduct: Product) => {
                this.products.unshift(newProduct);
                this.productsEdited.next(this.products.slice());
            }
        );
    }

    updateProduct(id: number, product: Product) {
        if (this.isLoading()) {
            return;
        }
        this.subscription = this.dataStorageService.updateProduct(id, product).subscribe(
            (newProduct: Product) => {
                const index = this.products.findIndex(x => x.id === id);
                if (index != null) {
                    this.products[index] = newProduct;
                }
                this.productsEdited.next(this.products.slice());
            }
        );
    }

    deleteProduct(id: number) {
        if (this.isLoading()) {
            return;
        }
        this.subscription = this.dataStorageService.deleteProduct(id).subscribe(
            (response) => {
                const index = this.products.findIndex(x => x.id === id);
                if (index != null) {
                    this.products.splice(index, 1);
                }
                this.productsEdited.next(this.products.slice());
            }
        );
    }
}
