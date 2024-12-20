import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { DataService } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../model/room';
import { FormResetService } from '../../form-reset.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  users: Array<User>;

  selectedUser: User;

  action: string;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private formResetService: FormResetService) {
    this.users = new Array<User>();
    this.selectedUser = new User();
    this.action = '';
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      next => {
        this.users = next ?? new Array<User>();
      }
    );

    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        this.action = params['action'];

        if (id) {
          this.selectedUser = this.users.find( user => user.id === +id) ?? new User();
        }
      }
    );
  }

  setUser(id: number) {
    this.router.navigate(['admin','users'], {queryParams : {id, action : 'view'}});
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin','users'], {queryParams : {action : 'add'}});
    this.formResetService.resetUserFormEvent.emit(this.selectedUser);
  }

}
