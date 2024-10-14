import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../../model/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room: Room;
  
  constructor(private router: Router) {
    this.room = new Room();
  }

  ngOnInit(): void {
  }

  editRoom() {
    this.router.navigate(['admin','rooms'], {queryParams : { action: 'edit', id: this.room.id}});
  }

}
