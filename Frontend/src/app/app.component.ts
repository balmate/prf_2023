import { Component, OnInit } from '@angular/core';
import { ConnectionService } from './utils/connection.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Giftcard';
  username: string = '';
  accessLevel: string = '';

  constructor(private connectionService: ConnectionService, private loginService: LoginService,
    private router: Router) {}

  ngOnInit(): void {
      this.username = localStorage.getItem('username') ?? '';
      this.accessLevel = localStorage.getItem('accessLevel')?? '';
  }

  logout() {
    this.loginService.logout().subscribe((res) => {
      window.location.reload();
      console.log(res);
      localStorage.removeItem('username');
      localStorage.removeItem('accessLevel');
    });
    this.username = '';
    this.accessLevel = '';
    this.router.navigate(['/login']);
  }

  hello() {
    this.connectionService.greet().subscribe((data) => {
      console.log('This came from the server: ', data);
    }, error => {
      console.log('Sorry we encountered an error: ', error);
    });
  }
}
