import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { DataService } from '../data.service';
import { Booking } from '../model/Booking';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  bookings: Array<Booking>;

  constructor(private dataService: DataService) {
    this.bookings = new Array<Booking>();
  }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe(
      next => this.bookings = next
    );
  }

}
