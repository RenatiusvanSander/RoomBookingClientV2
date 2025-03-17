import { Component, OnInit } from '@angular/core';
import { Booking } from '../../model/Booking';
import { Layout, Room } from '../../model/room';
import { DataService } from '../../data.service';
import { User } from '../../model/user';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map } from 'rxjs';

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

  dataLoaded = false;
  message = 'Please wait...';

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.booking = new Booking();
    this.rooms = new Array<Room>();
    this.users = new Array<User>();
  }

  ngOnInit(): void {
    this.rooms = this.route.snapshot.data['rooms'];
    this.users = this.route.snapshot.data['users'];

    const id = this.route.snapshot.queryParams['id'];
    if(id) {
      this.dataService.getBooking(+id)
      .pipe(map (booking => {
        booking.room = this.rooms.find(room => room.id === booking.room.id) ?? new Room();
        booking.user = this.users.find(user => user.id === booking.user.id) ?? new User();
        return booking;
      }))
      .subscribe(
        next => {
          this.booking = next;
          this.dataLoaded = true;
          this.message = '';
        }
      );
    } else {
      this.booking = new Booking();
      this.dataLoaded = true;
      this.message = '';
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
