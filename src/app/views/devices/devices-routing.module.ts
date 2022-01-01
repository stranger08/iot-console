import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { DeviceComponent } from "./device.component";
import { DevicesComponent } from './devices.component';
import { RegisterDeviceComponent } from "./register.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Devices'
        },
        children: [
            {
                path: '',
                component: DevicesComponent,
                data: {
                    title: 'List'
                },
            },
            {
                path: 'view/:id',
                component: DeviceComponent,
                data: {
                    title: 'Device'
                },
            },
            {
                path: 'create',
                component: RegisterDeviceComponent,
                data: {
                    title: 'Create'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DevicesRoutingModule {}