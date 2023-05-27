import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams/teams.component';
import { AddEditTeamComponent } from './add-edit-team/add-edit-team.component';
import { CommonDirectiveModule } from '../Shard/common-directive/common-directive.module';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamInfoComponent } from './team-details/team-info/team-info.component';
import { AddEditMemberDialogComponent } from './Dialog/add-edit-member-dialog/add-edit-member-dialog.component';
import { TeamScheduleComponent } from './team-details/team-schedule/team-schedule.component';


@NgModule({
  declarations: [
    TeamsComponent,
    AddEditTeamComponent,
    TeamDetailsComponent,
    TeamInfoComponent,
    AddEditMemberDialogComponent,
    TeamScheduleComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    CommonDirectiveModule
  ]
})
export class TeamsModule { }
