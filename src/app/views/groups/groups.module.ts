import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { GroupComponent } from './group.component';
import { GroupsComponent } from './groups.component';
import { CreateGroupComponent } from './create.component';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    GroupsRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    GroupComponent,
    GroupsComponent,
    CreateGroupComponent,
  ]
})
export class GroupsModule { }
