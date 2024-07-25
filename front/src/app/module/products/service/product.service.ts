import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { productNames } from '../mockup/product.mokup';

const baseUrl = 'http://localhost:8080/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  constructor(private http: HttpClient) { }

  getAllByFile():Observable<Product[]>{
    return this.http.get<Product[]>("../../../../assets/products.json");
  }
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl);
  }

  get(id: any): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/${id}`);
  }

  create(data: Product): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: number, data: Product): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  generateFrontProduct(): Product {
    const product: Product =  {
      id: Date.now(),
      name: this.generateName(),
      description: "Product Description",
      price: this.generatePrice(),
      quantity: this.generateQuantity(),
      category: "Product Category",
      inventoryStatus: this.generateStatus(),
      rating: this.generateRating(),
      code: this.generateCode()
    };

    product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
    return product;
    }
    generateCode() {
      let code = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
      for (var i = 0; i < 9; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      
      return code;
    }

    generateName() {
        return productNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generatePrice() {
        return Math.floor(Math.random() * Math.floor(299)+1);
    }

    generateQuantity() {
        return Math.floor(Math.random() * Math.floor(75)+1);
    }

    generateStatus() {
        let status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

        return status[Math.floor(Math.random() * Math.floor(3))];
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5)+1);
    }

}
