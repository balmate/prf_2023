import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private httpClient: HttpClient) { }

  greet() {
    console.log('Hello from the service!');
    return this.httpClient.get(environment.server, {responseType: 'text', withCredentials: true});
  }
}
