import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Device } from '../device';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent {

  newDevice: Device = new Device();

  @Output()
  create: EventEmitter<Device> = new EventEmitter();

  constructor() {
  }

  createDevice(form: NgForm) {
    if(form.valid){
      this.newDevice.name = form.value.name;
      this.create.emit(this.newDevice);
      form.reset();
    }
  }

}
