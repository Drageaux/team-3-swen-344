import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceListItemComponent } from './device-list-item/device-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DevicesComponent, DeviceListComponent, DeviceListItemComponent]
})
export class DevicesModule { }
