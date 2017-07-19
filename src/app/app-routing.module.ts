import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProductEditComponent} from "./products/product-edit/product-edit.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: 'products', component: ProductsComponent, children: [
    { path: 'new', component: ProductEditComponent },
    { path: 'edit/:id', component: ProductEditComponent },
    { path: 'edit', redirectTo: '/products' },
  ] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
