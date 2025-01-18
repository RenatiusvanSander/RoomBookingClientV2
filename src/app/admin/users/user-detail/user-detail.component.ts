import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';

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
    this.message = 'deleting...';
    this.dataService.deleteUser(this.user.id).subscribe(
      next => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin','users']);
      }, error => this.message = 'Sorry, this user cannot be deleted at this time.'
    );
  }

  resetPassword() {
    this.message = 'please wait...';
    this.dataService.resetUserPassword(this.user.id).subscribe(
      next => {
        this.message = 'The password has been reset.';
        setTimeout(() => {this.message = '';}, 3000);

      },
      error => this.message = 'Sorry, something went wrong.'
    );
  }

}
