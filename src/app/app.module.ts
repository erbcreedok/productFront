import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { HttpModule } from '@angular/http';
import { ProductService } from './products/product.service';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { DataStorageService } from './shared/data-storage.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule} from './app-routing.module';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { MomentModule } from 'angular2-moment';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByTextPipe } from './shared/filter-by-text.pipe';
import { FilterByRangePipe } from './shared/filter-by-range.pipe';
import { FilterByContainPipe } from './shared/filter-by-contain.pipe';
import { ProductFiltersComponent } from './products/product-filters/product-filters.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ErrorWindowComponent } from './error-window/error-window.component';
import {ErrorHandleService} from "./shared/error-handle.service";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    HeaderComponent,
    ProductsComponent,
    NotFoundComponent,
    ProductItemComponent,
    DropdownDirective,
    FilterByTextPipe,
    FilterByRangePipe,
    FilterByContainPipe,
    ProductFiltersComponent,
    ProductEditComponent,
    ErrorWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    OrderModule,
    MyDatePickerModule,
    HttpModule,
  ],
  providers: [ProductService, DataStorageService, ErrorHandleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
