import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Device } from '../device';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['../devices.component.css']
})
export class DeviceFormComponent {

  newDevice: Device = new Device();

  @Input()
  creating: boolean;

  @Input()
  editableDevice: Device = new Device();//new device by default

  @Output()
  create: EventEmitter<Device> = new EventEmitter();

  @Output()
  edit: EventEmitter<Device> = new EventEmitter();


  constructor() {
  }

  createDevice(form: NgForm) {
    if(form.valid){
      this.newDevice.name = form.value.devName;
      this.newDevice.type = form.value.type;
      this.newDevice.serial = form.value.serial;
      this.create.emit(this.newDevice);
      form.reset();
    }
  }

  editDevice(form: NgForm){
    if(form.valid){
      this.editableDevice.name = form.value.devName;
      this.editableDevice.type = form.value.type;
      this.editableDevice.serial = form.value.serial;
      this.edit.emit(this.editableDevice);
      //console.log(this.editableDevice);
    }
  }

}
