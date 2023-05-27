import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
    path: '',
    redirectTo :'View',
  },
  {
    path: 'View',
    component: ScheduleComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
