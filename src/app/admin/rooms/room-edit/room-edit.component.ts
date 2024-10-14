import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../../model/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent implements OnInit{

  @Input()
  room: Room;
  
  constructor() {
    this.room = new Room();
  }

  ngOnInit(): void {
  }

}
