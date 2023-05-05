import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    console.log('Get users from the server...');
    return this.httpClient.get(environment.server + '/users');
  }

  getProducts() {
    console.log('Get products from the server...');
    return this.httpClient.get(environment.server + '/products');
  }

  getProduct(id: string) {
    console.log('Get product by id...');
    const params = new HttpParams().set('id', id)
    return this.httpClient.get(environment.server + '/product', {params: params});
  }

  updateProduct(id: string, name: string, price: number, description: string) {
    console.log('Updating product...');
    const params = new HttpParams().appendAll({'id': id, 'name': name, 'price' : price, 'description': description})
    return this.httpClient.put(environment.server + '/products', {params: params}, {responseType: 'text'});
  }

  deleteProduct(id: string) {
    console.log('Deleting product...');
    const params = new HttpParams().append('id', id);
    return this.httpClient.delete(environment.server + '/products', {params: params});
  }

  addProduct(id: string, name: string, price: number, description: string) {
    console.log('Adding a new product...');
    const params = new HttpParams().appendAll({'id': id, 'name': name, 'price' : price, 'description': description})
    return this.httpClient.post(environment.server + '/products', {params: params}, {responseType: 'text'});
  }
}
