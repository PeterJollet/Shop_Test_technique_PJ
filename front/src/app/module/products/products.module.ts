import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsAdminComponent } from './component/products-admin/products-admin.component';
import { ProductsComponent } from './component/products/products.component';
import { ProductService } from './service/product.service';
import {  SharedModule } from "../../shared/shared.module";
import { PrimeNGModule } from 'app/shared/utils/primeng/primeng.module';



@NgModule({
  declarations: [ProductsAdminComponent,ProductsComponent,],
  providers:[ProductService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    PrimeNGModule,
    
    CommonModule,
]
})
export class ProductsModule { }
