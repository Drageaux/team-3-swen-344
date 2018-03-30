import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from '../device';
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['../devices.component.css']
})
export class DeviceListComponent {

  @Input()
  devices: Device[];

  @Output()
  delete: EventEmitter<Device> = new EventEmitter();

  @Output()
  edit: EventEmitter<Device> = new EventEmitter();

  constructor() { }

  editDevice(device: Device){
    this.edit.emit(device);
  }

  deleteDevice(device: Device){
    this.delete.emit(device);
  }



}
