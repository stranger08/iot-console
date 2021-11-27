import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { DeviceComponent } from "./device.component";
import { DevicesComponent } from './devices.component';

const routes: Routes = [
    {
        path: '',
        component: DevicesComponent,
        data: {
            title: 'Devices'
        },
    },
    {
        path: ':id',
        component: DeviceComponent,
        data: {
            title: 'Device'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DevicesRoutingModule {}