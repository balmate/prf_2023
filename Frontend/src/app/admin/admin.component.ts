import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  username: string = '';
  title: string = 'Admin page';
  users: Array<{_id: string, username: string, email: string}> = [];

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    this.username = localStorage.getItem('username') ?? '';
    this.dataService.getUsers().subscribe((res: any) => {
        this.users = res;  
      });
  }

}
