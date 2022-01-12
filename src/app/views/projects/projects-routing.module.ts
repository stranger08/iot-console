import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from "./project.component";
import { ProjectsComponent } from './projects.component';
import { CreateProjectComponent  } from "./create.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Projects'
        },
        children: [
            {
                path: '',
                component: ProjectsComponent,
                data: {
                    title: 'List'
                },
            },
            {
                path: 'view/:id',
                component: ProjectComponent,
                data: {
                    title: 'User'
                }
            },
            {
                path: 'create',
                component: CreateProjectComponent,
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
export class ProjectsRoutingModule {}