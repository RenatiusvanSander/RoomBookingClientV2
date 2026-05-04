import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  logout() {
    this.authService.logout();
    this.navigateToHome
  }

  userIsLoggedIn = false;

  constructor(private router : Router, private authService: AuthService) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticated) {
      this.userIsLoggedIn = true;
    }
  }

  navigateToRoomsAdmin() {
    this.router.navigate(['admin','rooms']);
  }

  navigateToUsersAdmin() {
    this.router.navigate(['admin','users']);
  }

  navigateToCalendar() {
    this.router.navigate(['']);
  }

  navigateToHome() {
    this.navigateToCalendar();
  }

}
