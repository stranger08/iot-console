import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { GroupComponent } from "./group.component";
import { GroupsComponent } from './groups.component';
import { CreateGroupComponent  } from "./create.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Groups'
        },
        children: [
            {
                path: '',
                component: GroupsComponent,
                data: {
                    title: 'List'
                },
            },
            {
                path: 'view/:id',
                component: GroupComponent,
                data: {
                    title: 'Group'
                }
            },
            {
                path: 'create',
                component: CreateGroupComponent,
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
export class GroupsRoutingModule {}