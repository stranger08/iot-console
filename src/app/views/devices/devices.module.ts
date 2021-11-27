import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { DeviceComponent } from './device.component';
import { DevicesComponent } from './devices.component';
import { DevicesRoutingModule } from './devices-routing.module';

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    DevicesRoutingModule,
  ],
  declarations: [
    DeviceComponent,
    DevicesComponent
  ]
})
export class DevicesModule { }
