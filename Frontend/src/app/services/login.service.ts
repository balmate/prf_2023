import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.post(environment.server + '/login', {username: username, password: password}, {responseType: 'text'});
  }

  logout() {
    return this.httpClient.post(environment.server + '/logout', {withCredentials: true, responseType: 'text'});
  }

  register(username: string, email: string, password: string) {
    return this.httpClient.post(environment.server + '/register', {username: username, email:email, password: password}, {responseType: 'text'});
  }
}
