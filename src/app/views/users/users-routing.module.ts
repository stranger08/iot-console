import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from "./user.component";
import { UsersComponent} from './users.component';
import { CreateUserComponent } from "./create.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Users'
        },
        children: [
            {
                path: '',
                component: UsersComponent,
                data: {
                    title: 'List'
                },
            },
            {
                path: 'view/:id',
                component: UserComponent,
                data: {
                    title: 'User'
                }
            },
            {
                path: 'create',
                component: CreateUserComponent,
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
export class UsersRoutingModule {}