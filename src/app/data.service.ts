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
    return this.http.get<Array<Room>>(environment.restUrl + '/api/rooms')
    .pipe(
      map( data => {
        const rooms = new Array<Room>();
        for (const room of data) {
          rooms.push(Room.fromHttp(room));
        }

        return rooms;
      })
    );
  }

  getUsers() : Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/users')
    .pipe(
      map( data => {
        const users = new Array<User>();
        for(const user of data) {
          users.push(User.fromHttp(user));
        }
        return users;
      })
    );
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
    return this.http.put<User>(environment.restUrl + '/api/users', user);
  }

  addUser(newUser: User, password: string) : Observable<User> {
    const fullUser = {id: newUser.id, name: newUser.name, password: password};
    return this.http.post<User>(environment.restUrl + '/api/users', fullUser);
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

}
