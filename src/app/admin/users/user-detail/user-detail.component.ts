import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  @Input()
  user: User;

  constructor(private dataService: DataService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.user;
  }

}
