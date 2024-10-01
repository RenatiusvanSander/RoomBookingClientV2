import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  @Input()
  user: User;

  message: string;

  formUser: User;

  constructor() {
    this.user = new User();
    this.message = '';
    this.formUser = new User();
  }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
  }

  onSubmit() {
    console.log('we need to save the user', this.formUser);
  }
}
