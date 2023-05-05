import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: string = '';
  title: string = 'Login page';
  username: string;
  password: string;
  accessLevel: string = '';

  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.password = '';
   }

   login() {
    if (this.username != '' && this.password != '') {
      this.loginService.login(this.username, this.password).subscribe((accessLevel) => {
        console.log('Sikeres bejelentkezes...');
        localStorage.setItem('username', this.username);
        this.accessLevel = accessLevel;
        localStorage.setItem('accessLevel', accessLevel);
        if (this.accessLevel === 'admin') this.router.navigate(['/admin']);
        else this.router.navigate(['/products']);
      }, error => {
        console.log(error);
      });
    }
   }

  ngOnInit(): void {
    // if (localStorage.getItem('user')) {
    //   localStorage.removeItem('user');
    //   this.loginService.logout().subscribe((msg) => {
    //     console.log(msg);
    //   }, error => {
    //     console.log(error);
    //   });
    // }
  }

}
