import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { DataService } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../model/room';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  users: Array<User>;

  selectedUser: User;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    this.users = new Array<User>();
    this.selectedUser = new User();
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
        this.selectedUser = this.users.find( user => user.id === +id) ?? new User();
      }
    );
  }

  selectUser(id: number) {
    this.router.navigate(['admin','users'], {queryParams : {id}});
  }

}
