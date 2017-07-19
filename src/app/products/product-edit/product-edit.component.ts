import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  editMode = false;
  id: number;
  productForm: FormGroup;



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
      const product = this.productService.getProduct(this.id);
      productCode = product.productCode;
      productName = product.productName;
      productDescription = product.productDescription;
      cost = product.cost + '';
      stock = product.stock + '';
      isDiscontinued = product.discontinued != null;
    }
    this.productForm = new FormGroup({
      'productCode': new FormControl(productCode, [Validators.pattern(/^\w*$/)]),
      'productName': new FormControl(productName, Validators.required),
      'productDescription': new FormControl(productDescription, Validators.required),
      'cost': new FormControl(cost, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      'stock': new FormControl(stock, [Validators.required, Validators.pattern(/^\d+$/)]),
      'isDiscontinued': new FormControl(isDiscontinued, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.productForm);
    if (!this.productForm.valid) {
      alert('Form is wrong!');
      return;
    }
    if (this.editMode) {
      this.productService.updateProduct(this.id, this.productForm.value);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
