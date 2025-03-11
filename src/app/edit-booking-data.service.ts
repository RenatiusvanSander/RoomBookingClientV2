import { Injectable } from '@angular/core';
import { Room } from './model/room';
import { User } from './model/user';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EditBookingDataService {

  rooms: Array<Room>;
  users: Array<User>;

  dataLoaded = 0;

  constructor(private dataService: DataService) {
    this.rooms = new Array<Room>();
    this.users = new Array<User>();

    this.dataService.getRooms().subscribe(
      next => {
        this.rooms = next;
        this.dataLoaded++;
      }
    );

    this.dataService.getUsers().subscribe(
      next => {
        this.users = next;
        this.dataLoaded++;
      }
    );
  }
}
