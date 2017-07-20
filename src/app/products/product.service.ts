import {Injectable, OnInit} from '@angular/core';
import 'rxjs/Rx';
import {Product} from './product.model';
import {DataStorageService} from '../shared/data-storage.service';
import {Subject} from 'rxjs/Subject';

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

    order = {
        sort: 'id',
        order: true
    }

    limit = {
        offset: 0,
        limit: 20
    }

    constructor(private dataStorageService: DataStorageService) {
        // this.loadProducts();
    }

    loadProducts() {
        this.dataStorageService.getProducts().subscribe(
            (products: Product[]) => {
                this.products = products;
                this.productsEdited.next(this.products.slice());
            }
        );
    }

    loadProduct(id: number) {
        this.dataStorageService.getProduct(id).subscribe(
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
        this.dataStorageService.getProductsByOptions(this.order, this.limit, {}).subscribe(
            (products: Product[]) => {
                this.products = products;
                this.productsEdited.next(this.products.slice());
            }
        );
    }

    getProductsByFilters(filters: any) {
        this.dataStorageService.getProductsByOptions(this.order, this.limit, filters).subscribe(
            (products: Product[]) => {
                this.products = products;
                this.productsEdited.next(this.products.slice());
            }
        );
    }

    addProduct(product: Product) {
        this.dataStorageService.addProducts(product).subscribe(
            (newProduct: Product) => {
                console.log(newProduct);
            }
        );
        this.productsEdited.next(this.products.slice());
    }

    updateProduct(id: number, product: Product) {
        this.dataStorageService.updateProduct(id, product).subscribe(
            (newProduct: Product) => {
                console.log(newProduct);
            }
        );
        this.productsEdited.next(this.products.slice());
    }
}
