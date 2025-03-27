import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  message = '';
  name: string;
  password:string;

  constructor(private autService: AuthService) {
    this.name = '';
    this.password = '';
  }

  onSubmit() {
    if(this.autService.authenticate(this.name, this.password)) {
      // navigation here
    } else {
      this.message = 'Your username or password was not recognised - try again.'
    }
  }
}
