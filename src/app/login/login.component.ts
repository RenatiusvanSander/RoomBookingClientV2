import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  message = '';
  name: string;
  password:string;

  constructor(private autService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.name = '';
    this.password = '';
  }

  onSubmit() {
    if(this.autService.authenticate(this.name, this.password)) {
      const url = this.activatedRoute.snapshot.queryParams['requested'];
      this.router.navigateByUrl(url);
    } else {
      this.message = 'Your username or password was not recognised - try again.'
    }
  }
}
