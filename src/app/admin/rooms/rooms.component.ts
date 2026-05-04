import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Room } from '../../model/room';
import { ActivatedRoute, Router } from '@angular/router';
import { FormResetService } from '../../form-reset.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;
  action: string;
  loadingData = true;
  message: string = 'Please wait ... getting the list of rooms';
  reloadAttempts = 0;
  isAdminUser: boolean = false;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private formResetService: FormResetService, private authService: AuthService) {
    this.rooms = new Array<Room>();
    this.selectedRoom = new Room();
    this.action = '';
  }

  loadData() {
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next ?? new Room();
        this.loadingData = false;
        this.processUrlParams();
      },
      (error) => {
        if (error.status === 402) {
          this.message = 'Payment required!';
        } else {
          this.reloadAttempts++;

          if (this.reloadAttempts <= 10) {
            this.message = 'Sorry - something went wrong, trying again.... please wait';
            this.loadData();
          } else {
            this.message = 'Sorry - something went wrong, please contact support';
          }
        }
      }
    );
  }

  processUrlParams() {
    this.route.queryParams.subscribe(
      (params) => {
        this.action = '';
        const id = params['id'];

        if (id) {
          this.selectedRoom = this.rooms.find((room: { id: number }) => room.id === +id) ?? new Room();
          this.action = params['action'];
        }

        if (params['action'] === 'add') {
          this.selectedRoom = new Room();
          this.action = 'edit';
          this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
        }
      });
  }

  ngOnInit(): void {
    this.loadData();
    console.log('role', this.authService.role);
    if(this.authService.role === 'ADMIN') {
      this.isAdminUser = true;
    }

    this.authService.roleSetEvent.subscribe(
      next => {
        if(next === 'ADMIN') {
          this.isAdminUser = true;
        } else {
          this.isAdminUser = false;
        }
      }
    );
  }

  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], { queryParams: { id, action: 'view' } });
  }

  addRoom() {
    this.router.navigate(['admin', 'rooms'], { queryParams: { action: 'add' } });
  }
}
