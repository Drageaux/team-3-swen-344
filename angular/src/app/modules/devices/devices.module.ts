import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { DeviceListComponent } from './device-list/device-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DevicesComponent, DeviceListComponent]
})
export class DevicesModule { }
