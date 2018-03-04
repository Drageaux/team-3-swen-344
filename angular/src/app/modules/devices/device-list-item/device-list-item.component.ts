import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../device';

@Component({
  selector: 'app-device-list-item',
  templateUrl: './device-list-item.component.html',
  styleUrls: ['./device-list-item.component.css']
})
export class DeviceListItemComponent {

  @Input()
  device: Device;

  @Output()
  edit: EventEmitter<Device> = new EventEmitter();

  @Output()
  delete: EventEmitter<Device> = new EventEmitter();

  constructor() { }

  editDevice(device: Device){
    this.edit.emit(device);
  }

  deleteDevice(device: Device){
    this.delete.emit(device);
  }

}
