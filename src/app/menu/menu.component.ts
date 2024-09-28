import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  constructor(private router : Router) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
