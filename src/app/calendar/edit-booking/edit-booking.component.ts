import { Component, OnInit } from '@angular/core';
import { Booking } from '../../model/Booking';
import { Layout, Room } from '../../model/room';
import { DataService } from '../../data.service';
import { User } from '../../model/user';

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

  constructor(private dataService: DataService) {
    this.booking = new Booking();
    this.rooms = new Array<Room>();
    this.users = new Array<User>();
  }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      next => this.rooms = next
    );
  }

  getLayoutByKey(layoutKey: string): Layout {
    return this.layoutEnum[layoutKey as keyof typeof Layout];
  }
}
