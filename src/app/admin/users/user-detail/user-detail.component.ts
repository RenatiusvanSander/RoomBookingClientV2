import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  @Input()
  user: User;

  constructor(private dataService: DataService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.user;
  }

  editUser() {
    this.router.navigate(['admin', 'users'], {queryParams: {action: 'edit', id : this.user.id}});
  }

  deleteUser() {
    this.dataService.deleteUser(this.user.id).subscribe(
      next => {
        this.router.navigate(['admin','users']);
      }
    );
  }

  resetPassword() {
    this.dataService.resetUserPassword(this.user.id).subscribe();
    console.log('User Password has been reset.');
  }

}
