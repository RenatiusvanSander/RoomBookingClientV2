import { Injectable } from '@angular/core';
import { Room } from './model/room';
import { User } from './model/user';
import { map, Observable, of } from 'rxjs';
import { Booking } from './model/Booking';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getRooms() : Observable<Array<Room>> {
    return of(new Array<Room>());
  }

  getUsers() : Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/users');
  }

  getBookings(date: string) : Observable<Array<Booking>> {
    return of(new Array<Booking>());
  }

  getBooking(id: number) : Observable<Booking> {
    return of(new Booking());
  }

  saveBooking(booking: Booking) : Observable<Booking> {
    return of(new Booking());
  }

  addBooking(newBooking: Booking) : Observable<Booking> {
    return of(new Booking());
  }

  deleteBooking(id: number) : Observable<any> {
    return of(null);
  }

  constructor(private http: HttpClient) {
    console.log(environment.restUrl);
  }

  updateUser(user: User) : Observable<User> {
    return of(new User());
  }

  addUser(newUser: User, password: string) : Observable<User> {
    return of(new User());
  }

  deleteRoom(id: number) : Observable<any> {
    return of(null);
  }

  deleteUser(id: number) : Observable<any> {
    return of(null);
  }

  resetUserPassword(id: number) : Observable<any> {
    return of(null);
  }

  getUser(id: number) : Observable<User> {
    return this.http.get<User>(environment.restUrl + '/api/users/' + id)
    .pipe( map( data => {
      return User.fromHttp(data);
    }));
  }
}
