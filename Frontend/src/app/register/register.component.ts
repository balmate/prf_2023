import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  currentUser: string = '';
  title: string = 'Register page';
  username: string;
  password: string;
  email: string = '';

  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.password = '';
   }

   register() {
    if (this.username != '' && this.password != '' && this.email != '') {
      this.loginService.register(this.username, this.email, this.password).subscribe((msg) => {
        console.log('Sikeres bejelentkezes...');
        window.location.reload();
      }, error => {
        console.log(error);
      });
      this.router.navigate(['/login']);
    }
   }

  ngOnInit(): void {
  }

}
