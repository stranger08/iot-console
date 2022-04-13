import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ControlComponent } from './control.component';
import { ControlsComponent} from './controls.component';
import { CreateControlComponent } from './create.component';
import { ControlsRoutingModule } from './control-routing.module';

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    ControlsRoutingModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  declarations: [
    ControlComponent,
    ControlsComponent,
    CreateControlComponent,
  ]
})
export class ControlsModule { }
