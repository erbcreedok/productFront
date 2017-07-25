import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {Product} from '../product.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  editMode = false;
  id: number;
  productForm: FormGroup;
  isLoading = false;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          this.editMode = params['id'] != null;
          this.id = +params['id'];
          this.initForm();
        }
    );
  }

  private initForm() {
    let productCode = '';
    let productName = '';
    let productDescription = '';
    let cost = '';
    let stock = '';
    let isDiscontinued = false;

    if (this.editMode) {
      const product: Product = this.productService.getProduct(this.id);
      if (product) {
        productCode = product.productCode;
        productName = product.productName;
        productDescription = product.productDescription;
        cost = product.cost + '';
        stock = product.stock + '';
        isDiscontinued = product.discontinued != null;
      } else {
        this.isLoading = true;
        this.productService.loadProduct(this.id);
        const subscription = this.productService.productLoaded.subscribe(
            (data: Product) => {
              this.isLoading = false;
              subscription.unsubscribe();
              if (data) {
                this.editForm(data);
              } else {
                this.router.navigate(['../'], {relativeTo: this.route});
              }
            }
        );
      }
    }
    this.productForm = new FormGroup({
      'productCode': new FormControl(productCode,
          [Validators.required, Validators.pattern(/^\w*$/)],
          [this.productCodeValidator.bind(this)]),
      'productName': new FormControl(productName, Validators.required),
      'productDescription': new FormControl(productDescription, Validators.required),
      'cost': new FormControl(cost, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      'stock': new FormControl(stock, [Validators.required, Validators.pattern(/^\d+$/)]),
      'isDiscontinued': new FormControl(isDiscontinued, Validators.required),
    }, this.productValidator );
  }

  editForm(product: Product) {
    this.productForm.setValue({
      'productCode': product.productCode,
      'productName': product.productName,
      'productDescription': product.productDescription,
      'cost': product.cost + '',
      'stock': product.stock + '',
      'isDiscontinued': product.discontinued != null,
    })
  }

  onSubmit() {
    if (!this.productForm.valid) {
      alert('Form is wrong!');
      return;
    }
    if (this.editMode) {
      this.productService.updateProduct(this.id, this.productForm.value);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.onCloseEdit();
  }

  onCloseEdit() {
    if (this.editMode) {
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  productValidator(group: FormGroup): {[s: string]: boolean} {
    if (+group.get('cost').value < 5 && +group.get('stock').value < 10) {
      return {'costStockValidation': true};
    }
    return null
  }

  productCodeValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any> ((resolve, reject) => {
      this.productService.isProductCodeFree(control.value).subscribe(
          (data: number) => {
            if (data !== this.id && data !== -1) {
              resolve({'ProductCodeIsTaken': true});
            } else {
              resolve(null);
            }
          }
      );
    });
    return promise;
  }


}
