import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Room } from '../../model/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit{

  rooms: Array<Room>;
  selectedRoom: Room;

  constructor(private dataService: DataService) {
    this.rooms = new Array<Room>();
    this.selectedRoom = new Room();
  }

  ngOnInit(): void {
      console.log(this.dataService.rooms);
      this.rooms = this.dataService.rooms;
  }

  setRoom(id: number) {
    this.selectedRoom = this.rooms.find( (room: {id: number})  => room.id === id) ?? new Room();
  }
}
