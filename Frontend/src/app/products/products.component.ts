import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  title: string = 'Products page';
  products: Array<{id: string, name: string, picture: string, price: number, description: string}> = [];

  constructor(private dataService: DataService, private router: Router ) { }

  ngOnInit(): void {
    this.dataService.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }
  
  viewProduct(id: any) {
    this.router.navigate(['/product/' + id]);
  }

}
