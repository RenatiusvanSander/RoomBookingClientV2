import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Layout, LayoutCapacity, Room } from '../../../model/room';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../data.service';
import { FormResetService } from '../../../form-reset.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent implements OnInit, OnDestroy{

  @Input()
  room: Room;

  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  layoutTypes: Array<string> = Object.keys(Layout).filter(key => isNaN(+key));

  roomForm: FormGroup;

  resetEventSubscription: Subscription;
  
  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private formResetService: FormResetService) {
    this.room = new Room();
    this.roomForm = this.formBuilder.group({});
    this.resetEventSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetRoomFormEvent.subscribe(
      room => {
        this.room = room;
        this.initializeForm();
      }
    );
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  private initializeForm() {
    this.roomForm = this.formBuilder.group(
      {
        roomName: [this.room.name, Validators.required],
        location: [this.room.location, [Validators.required, Validators.minLength(2)]]
      });

    for (const layout of this.layouts) {
      const layoutCapacity = this.room.capacities.find(lc => lc.layout === this.getLayoutByKey(layout));
      const initialCapacity = layoutCapacity == null ? 0 : layoutCapacity.capacity;
      this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(initialCapacity));
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
    console.log(this.roomForm);
  }

  getLayoutByKey(layoutKey: string): Layout {
    return this.layoutEnum[layoutKey as keyof typeof Layout];
  }

}
