import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Room } from '../../model/room';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit{

  rooms: Array<Room>;
  selectedRoom: Room;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.rooms = new Array<Room>();
    this.selectedRoom = new Room();
  }

  ngOnInit(): void {
      console.log(this.dataService.rooms);
      this.rooms = this.dataService.rooms;
      this.route.queryParams.subscribe(
        (params) => {
          const id = params['id'];

          if (id) {
            this.selectedRoom = this.rooms.find( (room: {id: number})  => room.id === +id) ?? new Room();
          }
        }
      );
  }

  setRoom(id: number) {
    this.router.navigate(['admin','rooms'], { queryParams : { id: id}});
  }
}