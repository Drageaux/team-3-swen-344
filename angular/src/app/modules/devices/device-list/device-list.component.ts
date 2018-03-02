import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from '../device';
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent {

  @Input()
  devices: Device[];

  @Output()
  delete: EventEmitter<Device> = new EventEmitter();

  constructor() { }

  onDeleteDevice(device: Device){
    this.delete.emit(device);
  }

}
