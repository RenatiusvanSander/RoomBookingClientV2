import { Component, Input, OnInit } from '@angular/core';
import { Layout, LayoutCapacity, Room } from '../../../model/room';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent implements OnInit{

  @Input()
  room: Room;

  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  layoutTypes: Array<string> = Object.keys(Layout).filter(key => isNaN(+key));

  roomForm = new FormGroup<{[key: string]:FormControl|FormArray}>(
    {
      roomName : new FormControl('roomName'),
      location: new FormControl('location'),
    }
  );
  
  constructor() {
    this.room = new Room();
  }

  ngOnInit(): void {
    this.roomForm.patchValue({
      roomName:  this.room.name,
      location: this.room.location
    });

    for (const layout of this.layouts) {
      this.roomForm.addControl(`layout${layout}`, new FormControl(`layout${layout}`));
    }
  }

  onSubmit() {
    this.room.name = this.roomForm.controls['roomName'].value ?? '';
    this.room.location = this.roomForm.value['location'] ?? '';
    this.room.capacities = new Array<LayoutCapacity>();
    
    for(const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = this.getLayoutByKey(layout);
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);
    }
    
    console.log(this.room);
  }

  getLayoutByKey(layoutKey: string): Layout {
    return this.layoutEnum[layoutKey as keyof typeof Layout];
  }

}
