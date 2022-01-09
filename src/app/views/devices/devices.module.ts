import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DeviceComponent } from './device.component';
import { DevicesComponent } from './devices.component';
import { RegisterDeviceComponent } from './register.component';
import { DevicesRoutingModule } from './devices-routing.module';

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    DevicesRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    DeviceComponent,
    DevicesComponent,
    RegisterDeviceComponent,
  ]
})
export class DevicesModule { }
