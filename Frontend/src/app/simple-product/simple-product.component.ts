import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-simple-product',
  templateUrl: './simple-product.component.html',
  styleUrls: ['./simple-product.component.css']
})
export class SimpleProductComponent implements OnInit {
  title: string = 'Simple product page';
  product: any = null;
  admin: boolean = false;

  productName: string = '';
  productPrice: number = 0;
  productDescription: string = '';

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute ) { }

  async ngOnInit() {
    this.admin = localStorage.getItem('accessLevel') == 'admin' ? true : false;
    this.route.params.subscribe((params) => {
      this.dataService.getProduct(params['id']).subscribe((res: any) => {
        this.product = res[0];
        this.productName = this.product.name;
        this.productPrice = this.product.price;
        this.productDescription = this.product.description;
      });
    });
  }

  save(id: string) {
    this.dataService.updateProduct(id, this.productName, this.productPrice, this.productDescription).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/products']);
    });
  }

  delete(id: string) {
    this.dataService.deleteProduct(id).subscribe((res) => {
      alert('Deleted!');
      console.log(res);
    });
  }

}
