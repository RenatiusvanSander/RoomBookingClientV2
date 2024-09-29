import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../../model/room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room: Room;

  constructor() {
    this.room = new Room();
  }

  ngOnInit(): void {
  }

}
