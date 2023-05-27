import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { CommonDirectiveModule } from '../Shard/common-directive/common-directive.module';
import { AddEditScheduleComponent } from './schedule/add-edit-schedule/add-edit-schedule.component';



@NgModule({
  declarations: [
    ScheduleComponent,
    AddEditScheduleComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    CommonDirectiveModule
  ]
})
export class ScheduleModule { }
