import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;
  productSubscription: Subscription;

  isLoading = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.loadProduct();
        }
    );
  }

  loadProduct() {
    this.product = this.productService.getProduct(this.id);
    if (!this.product) {
      this.isLoading = true;
      this.productService.loadProduct(this.id);
      this.productSubscription = this.productService.productLoaded.subscribe(
          (product: Product) => {
            this.product = product;
            this.productSubscription.unsubscribe();
            this.isLoading = false;
            if (!this.product) {
              setTimeout(() => { this.onCloseModal() }, 3000);
            }
          }
      );
    }
  }

  onCloseModal() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onOpenEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }


}
