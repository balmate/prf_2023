import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Giftcard';
  username: string = '';
  accessLevel: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
      this.username = localStorage.getItem('username') ?? '';
      this.accessLevel = localStorage.getItem('accessLevel')?? '';
  }

  logout() {
    this.loginService.logout().subscribe((res) => {
      window.location.reload();
      console.log(res);
    });
    localStorage.removeItem('username');
    localStorage.removeItem('accessLevel');
    this.username = '';
    this.accessLevel = '';
    this.router.navigate(['/login']);
  }
}
