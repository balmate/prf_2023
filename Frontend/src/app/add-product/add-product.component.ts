import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  currentUser: string = '';
  title: string = 'Add product page';
  id: string = '';
  name: string = '';
  price: number = 0;
  description: string = '';
  accessLevel: string = '';

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  addProduct() {
    this.dataService.addProduct(this.id, this.name, this.price, this.description).subscribe((res) => {
      alert('Added!');
      console.log(res);
    });
  }

}
