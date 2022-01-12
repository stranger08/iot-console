import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProjectComponent } from './project.component';
import { ProjectsComponent } from './projects.component';
import { CreateProjectComponent } from './create.component';
import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  declarations: [
    ProjectComponent,
    ProjectsComponent ,
    CreateProjectComponent,
  ]
})
export class ProjectsModule { }
