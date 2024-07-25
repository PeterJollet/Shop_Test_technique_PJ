import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem, SortEvent } from 'primeng/api';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';
import { Table } from 'primeng/table';
import { product } from '../../mockup/product.mokup';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  @ViewChild('dt') dt: Table;
  products: Product[] = [];
  selectedProducts: Product[] = [];
  initialValue: Product[] = [];
  cols: any[] = []; 

  clonedProducts: { [s: string]: Product } = {};

  isSorted: boolean = null;

  constructor(private productService: ProductService,private messageService: MessageService) {}

  ngOnInit() {
    this.cols = [ 
      { field: "code", header: "Code" }, 
      { field: "name", header: "Name" }, 
    ]; 

    //this.products = product;
    this.productService.getAllByFile().subscribe({
      next: (data:any) => {
        this.products = data.data;
      },
      error: (e) => console.error(e)
    });
    
  }

  customSort(event: SortEvent) {
      if (this.isSorted == null || this.isSorted === undefined) {
          this.isSorted = true;
          this.sortTableData(event);
      } else if (this.isSorted == true) {
          this.isSorted = false;
          this.sortTableData(event);
      } else if (this.isSorted == false) {
          this.isSorted = null;
          this.products = [...this.initialValue];
          this.dt.reset();
      }
  }

  sortTableData(event) {
      event.data.sort((data1, data2) => {
          let value1 = data1[event.field];
          let value2 = data2[event.field];
          let result = null;
          if (value1 == null && value2 != null) result = -1;
          else if (value1 != null && value2 == null) result = 1;
          else if (value1 == null && value2 == null) result = 0;
          else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
          else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
          return event.order * result;
      });
  }
  applyFilterGlobal($event: any, stringVal: any) {
    console.log($event);
    console.log($event.target);
    console.log(($event.target as HTMLInputElement).value);
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  
  applyLocalFilter($event: any, stringVal: any) {
    console.log($event);
    console.log($event.target);
    this.dt!.filter(($event.target as HTMLInputElement).value, stringVal,'startsWith');
  }
  
  onRowEditInit(product: Product,index:number) {
    console.log("EDIT PROD."+product.id);

    this.clonedProducts[product.id] = {...this.products[index]};
    console.log(this.clonedProducts);
    
  }

  onRowEditSave(product: Product, index: number) {
    delete this.clonedProducts[product.id];
    // Si le branchement est fait à l'Api alors appeler ajouter : 
    //this.productService.update(product.id,product)
    this.messageService.add({severity:'success', summary: 'Success', detail:'Le Produit est mis à jour  '}); 
    
  }

  onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.id];
    delete this.products[product.id];
  }
  deleteProduct(product: Product,index:number) {
    console.log("DEL PROD.");

    // Si le branchement est fait à l'Api alors appeler ajouter : 
    //this.productService.delete(product.id)
    this.products = this.products.slice(0, index).concat( this.products.slice(index+1) );
  }
  
  deleteSeletedProduct() {
    this.selectedProducts.forEach((selectedproduct)=>{
      
      // Si le branchement est fait à l'Api alors appeler ajouter : 
      //this.productService.delete(product.id)
      let ind = this.products.indexOf(selectedproduct);
      this.products = this.products.slice(0, ind).concat( this.products.slice(ind+1) );

    })
  }
  addProduct(){
    console.log("ADD PROD.");
    let newProduct = this.productService.generateFrontProduct()
    // Si le branchement est fait à l'Api alors appeler ajouter : 
    this.productService.create(newProduct)

    this.products.push(newProduct);
  }
}
