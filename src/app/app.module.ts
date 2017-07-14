import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { HttpModule } from '@angular/http';
import { ProductService } from './products/product.service';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { DataStorageService } from './shared/dataStorage.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule} from './app-routing.module';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { MomentModule } from 'angular2-moment';
import {OrderModule} from 'ngx-order-pipe';
import {FilterPipeModule} from 'ngx-filter-pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    HeaderComponent,
    ProductsComponent,
    NotFoundComponent,
    ProductItemComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MomentModule,
    OrderModule,
    FilterPipeModule,
    HttpModule,
  ],
  providers: [ProductService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
