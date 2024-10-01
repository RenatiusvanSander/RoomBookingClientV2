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

  constructor() {
    this.user = new User();
    this.message = '';
  }

  ngOnInit(): void {
  }
}
