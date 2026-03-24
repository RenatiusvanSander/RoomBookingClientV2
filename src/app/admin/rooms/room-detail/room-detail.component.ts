import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from '../../../model/room';
import { Router } from '@angular/router';
import { DataService } from '../../../data.service';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room: Room;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';

  isAdminUSer: boolean = false;
  
  constructor(private router: Router, private dataService: DataService, private authService: AuthService) {
    this.room = new Room();
  }

  ngOnInit(): void {
    if(this.authService.role === 'ADMIN') {
      this.isAdminUSer = true;
    }
  }

  editRoom() {
    this.router.navigate(['admin','rooms'], {queryParams : { action: 'edit', id: this.room.id}});
  }

  deleteRoom() {
    const result = confirm('Are you sure you wish to delete this room?');

    if(result) {
      this.message = 'deleting...';
      this.dataService.deleteRoom(this.room.id).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin','rooms'])
        }, error => {
          this.message = 'Sorry - this room cannot be deleted at this time.';
        }
      );
    }
  }

}
