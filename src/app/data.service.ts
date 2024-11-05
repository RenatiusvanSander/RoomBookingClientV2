import { Injectable } from '@angular/core';
import { Layout, LayoutCapacity, Room } from './model/room';
import { User } from './model/user';
import { Observable, of } from 'rxjs';
import { Booking } from './model/Booking';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rooms: Array<Room>;
  users: Array<User>;
  bookings: Array<Booking>;

  getRooms() : Observable<Array<Room>> {
    return of(this.rooms);
  }

  getUsers() : Observable<Array<User>> {
    return of(this.users);
  }

  getBookings() : Observable<Array<Booking>> {
    return of(this.bookings);
  }

  constructor() {
    this.bookings = new Array<Booking>;
    this.rooms = new Array<Room>;
    const room1 = new Room();
    room1.id = 1;
    room1.name = 'First Room';
    room1.location = 'First Floor';

    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 50;

    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 20;

    room1.capacities.push(capacity1);
    room1.capacities.push(capacity2);

    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Second Room';
    room2.location = 'Third Floor';

    const capacity3 = new LayoutCapacity();
    capacity3.layout = Layout.THEATER;
    capacity3.capacity = 60;

    room2.capacities.push(capacity3);

    this.rooms.push(room1);
    this.rooms.push(room2);

    this.users = new Array<User>();

    const user1 = new User();
    user1.id = 1;
    user1.name = 'Matt';

    const user2 = new User();
    user2.id = 2;
    user2.name = 'Diana';

    const user3 = new User();
    user3.id = 3;
    user3.name = 'Suzanne';

    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);

    const booking1 = new Booking();
    booking1.id = 1;
    booking1.room = room1;
    booking1.user = user1;
    booking1.layout = Layout.THEATER;
    booking1.title = 'Example meeting';
    booking1.date = formatDate(new Date(),'yyyy-MM-dd','en-GB');
    booking1.startTime = '11:30';
    booking1.endTime = '12:30';
    booking1.participants = 12;

    const booking2 = new Booking();
    booking2.id = 2;
    booking2.room = room2;
    booking2.user = user2;
    booking2.layout = Layout.BOARD;
    booking2.title = 'Example 2 meeting';
    booking2.date = formatDate(new Date(),'yyyy-MM-dd','en-GB');
    booking2.startTime = '11:45';
    booking2.endTime = '12:56';
    booking2.participants = 13;

    this.bookings.push(booking1);
    this.bookings.push(booking2);
  }

  updateUser(user: User) : Observable<User> {
    const originalUser = this.users.find( u => u.id === user.id) ?? new User();
    originalUser.name = user.name;

    return of(originalUser);
  }

  addUser(newUser: User, password: string) : Observable<User> {
    let id = 0;
    for (const user of this.users) {
      if(user.id > id) {
        id = user.id;
      }
    }

    newUser.id = id + 1;
    this.users.push(newUser);
    
    return of(newUser);
  }

  deleteRoom(id: number) : Observable<any> {
    const room = this.rooms.find(r => r.id === id) ?? new Room();
    this.rooms.splice(this.rooms.indexOf(room), 1);
    return of(null);
  }

  deleteUser(id: number) : Observable<any> {
    const user = this.users.find(u => u.id === id) ?? new User();
    this.users.splice(this.users.indexOf(user), 1);
    return of(null);
  }

  resetUserPassword(id: number) : Observable<any> {
    return of(null);
  }
}
