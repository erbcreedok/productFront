import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.css']
})
export class ProductFiltersComponent implements OnInit {

  @Output() closeFilters = new EventEmitter<void> ();
  filterForm: FormGroup;
  today = new Date();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.initForm();
  }

  onClose() {
    this.closeFilters.emit();
  }

  private initForm() {
    this.filterForm = new FormGroup({
      'productCode': new FormControl(null, Validators.pattern(/^\w*$/)),
      'productName': new FormControl(null),
      'productDescription': new FormControl(null),
      'cost': new FormGroup({
        'from': new FormControl(null, [Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0)]),
        'to': new FormControl(null, [Validators.pattern(/^\d+(\.\d{1,2})?$/)])
      }, this.rangeValidator),
      'stock': new FormGroup({
        'from': new FormControl(null, [Validators.pattern(/^\d+$/), Validators.min(0)]),
        'to': new FormControl(null, [Validators.pattern(/^\d+$/)])
      }, this.rangeValidator),
      'discontinued': new FormGroup({
        'isOn': new FormControl(false),
        'isDiscontinued': new FormControl(false),
        'from': new FormControl(null),
        'to': new FormControl(null),
      }, this.rangeValidator)
    });
  }

  onSubmit() {
    console.log(this.filterForm.value);
    this.productService.getProductsByFilters(this.filterForm.value);
  }

  rangeValidator(group: FormGroup): {[s: string]: boolean} {
    // console.log(group.value['from']);
    // console.log(+group.value['from']);
    // console.log(typeof group.value['from']);
    if (group.value['from'] !== null && group.value['to'] && +group.value['from'] >= +group.value['to']) {
      return {'rangeIsIncorrect': true}
    }
    return null;
  }
}
