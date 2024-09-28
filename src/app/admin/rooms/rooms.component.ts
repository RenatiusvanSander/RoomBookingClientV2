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

  constructor(private dataService: DataService) {
    this.rooms = new Array<Room>();
  }

  ngOnInit(): void {
      console.log(this.dataService.rooms);
      this.rooms = this.dataService.rooms;
  }
}
