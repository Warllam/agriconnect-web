import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AgApiService} from "../../services/ag-api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private agApi: AgApiService, private router: Router) {}

  login() {
    /*this.agApi.login(this.username, this.password).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Authentication failed');
      }
    });*/
  }
}
