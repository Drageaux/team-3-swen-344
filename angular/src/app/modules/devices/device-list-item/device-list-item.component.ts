import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../device';

declare var $;

@Component({
  selector: 'app-device-list-item',
  templateUrl: './device-list-item.component.html',
  styleUrls: ['../devices.component.css']
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

  showCollapse(id: string): void {
    $('#' + id).collapse('toggle');
  }
}
