import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../../model/room';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent implements OnInit{

  @Input()
  room: Room;

  roomForm = new FormGroup(
    {
      roomName : new FormControl('roomName'),
      location: new FormControl('location')
    }
  );
  
  constructor() {
    this.room = new Room();
  }

  ngOnInit(): void {
    this.roomForm.patchValue({
      roomName:  this.room.name,
      location: this.room.location
    });
  }

  onSubmit() {
    this.room.name = this.roomForm.controls['roomName'].value ?? '';
    this.room.location = this.roomForm.value['location'] ?? '';
    console.log(this.room);
  }

}
