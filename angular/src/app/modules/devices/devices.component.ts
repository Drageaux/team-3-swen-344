import { Component, OnInit } from '@angular/core';
import { DevicesService } from './devices.service';
import { Device } from './device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [DevicesService]
})
export class DevicesComponent implements OnInit {

  devices: Device[] = [];

  constructor(private devicesService: DevicesService) {
  }

  ngOnInit() {
    this.devicesService.getAllDevices().subscribe(
      devices => {
        this.devices = devices;
      }
    );
  }

  onCreateDevice(device){
    this.devicesService.createDevice(device.name).subscribe(
      newDevice => {
        this.devices = this.devices.concat(newDevice);
      }
    );
  }

  onDeleteDevice(device) {
    this.devicesService.deleteDeviceByID(device.id).subscribe();
    this.devices = this.devices.filter(d => d.id !== device.id);

  }

}
