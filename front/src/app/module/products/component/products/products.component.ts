import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';
import { product } from '../../mockup/product.mokup';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
 
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('dv') dv: Table;

  products: Product[] = [];
  layout: string = 'grid';
  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  search!:string;
  sortKey: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log(product);
    //this.products=product;
    this.getProducts();this.sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
    ];
  }

  getProducts(): void {

    this.productService.getAllByFile().subscribe({
      next: (data:any) => {        
        this.products = data.data;
      },
      error: (e) => console.error(e)
    })
  } 

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  getSeverity (product: Product) {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
  };

  applyFilter($event: any) {
    console.log($event);
    console.log($event.target);
    console.log(($event.target as HTMLInputElement).value);
    this.dv!.filter(($event.target as HTMLInputElement).value,'name','contains')
  }
}
