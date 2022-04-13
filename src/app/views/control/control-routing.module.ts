import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ControlComponent } from "./control.component";
import { ControlsComponent } from "./controls.component";
import { CreateControlComponent  } from "./create.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Controls'
        },
        children: [
            {
                path: '',
                component: ControlsComponent,
                data: {
                    title: 'List'
                },
            },
            {
                path: 'view/:id',
                component: ControlComponent,
                data: {
                    title: 'Control'
                }
            },
            {
                path: 'create',
                component: CreateControlComponent,
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
export class ControlsRoutingModule {}