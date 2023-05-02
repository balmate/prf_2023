import { Component } from '@angular/core';
import { ConnectionService } from './utils/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

  constructor(private connectionService: ConnectionService  ) {}


  hello() {
    this.connectionService.greet().subscribe((data) => {
      console.log('This came from the server: ', data);
    }, error => {
      console.log('Sorry we encountered an error: ', error);
    });
  }
}
