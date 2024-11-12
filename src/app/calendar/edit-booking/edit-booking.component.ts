import { Component, OnInit } from '@angular/core';
import { Booking } from '../../model/Booking';
import { Layout, Room } from '../../model/room';
import { DataService } from '../../data.service';
import { User } from '../../model/user';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrl: './edit-booking.component.css'
})
export class EditBookingComponent implements OnInit{

  booking: Booking;
  rooms: Array<Room>;
  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  users: Array<User>;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.booking = new Booking();
    this.rooms = new Array<Room>();
    this.users = new Array<User>();
  }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      next => this.rooms = next
    );

    this.dataService.getUsers().subscribe(
      next => this.users = next
    );

    const id = this.route.snapshot.queryParams['id'];
    if(id) {
      this.dataService.getBooking(+id).subscribe(
        next => this.booking = next
      );
    } else {
      this.booking = new Booking();
    }
  }

  getLayoutByKey(layoutKey: string): Layout {
    return this.layoutEnum[layoutKey as keyof typeof Layout];
  }

  onSubmit() {
    if (this.booking.id != null) {
      this.dataService.saveBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    } else {
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      )
    }
  }
}
