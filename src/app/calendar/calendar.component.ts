import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  constructor() {}

  selectedDate = new Date();

  ngOnInit(): void {
    const date : string = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-UK');
  }

}
