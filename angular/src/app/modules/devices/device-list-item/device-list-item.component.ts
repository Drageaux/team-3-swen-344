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
  delete: EventEmitter<Device> = new EventEmitter();

  constructor() { }

  deleteDevice(device: Device){
    this.delete.emit(device);
  }

}
