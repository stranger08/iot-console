import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UsersComponent } from './users.component';
import { CreateUserComponent } from './create.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserComponent,
    UsersComponent,
    CreateUserComponent,
  ]
})
export class UsersModule { }
