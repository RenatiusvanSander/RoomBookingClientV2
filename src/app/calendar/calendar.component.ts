import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { DataService } from '../data.service';
import { Booking } from '../model/Booking';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  bookings: Array<Booking>;
  selectedDate : string;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    this.bookings = new Array<Booking>();
    this.selectedDate = '';
  }

  ngOnInit(): void {
    this.dataService.getUser(13)
    .subscribe(
      (next) => {
        console.log(next);
        console.log(typeof next);
        console.log(next.getRole());
      }
    );

    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
        }
        this.dataService.getBookings(this.selectedDate).subscribe(
          next => this.bookings = next
        );
      }
    );
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], {queryParams: {id}});
  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id: number) {
    this.dataService.deleteBooking(id).subscribe();
  }

  dateChanged() {
    this.router.navigate([''], {queryParams : {date : this.selectedDate}});
  }

}
