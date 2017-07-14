import {Injectable, OnInit} from '@angular/core';
import 'rxjs/Rx';
import {Product} from './product.model';
import {DataStorageService} from '../shared/dataStorage.service';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class ProductService implements OnInit {
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
            new Date()
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
        )
    ];

    productsEdited = new Subject<Product[]> ();

    constructor(private dataStorageService: DataStorageService) { }

    ngOnInit() {}

    getProducts() {
        return this.products.slice();
    }

    addProduct(product: Product) {
        this.products.push(product);
        this.productsEdited.next(this.products.slice());
    }

    updateProduct(id: number, product: Product) {
        const index = this.products.findIndex(i => i.id === id);
        this.products[index] = product;
        this.productsEdited.next(this.products.slice());
    }
}
