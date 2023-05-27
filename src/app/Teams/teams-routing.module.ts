import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailsComponent } from './team-details/team-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo :'View',
  },
  {
    path: 'View',
    component: TeamsComponent 
  },
  {
    path: 'details/:id',
    component: TeamDetailsComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeamsRoutingModule { }
