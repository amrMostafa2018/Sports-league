import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Layout/home/home.component';


const routes: Routes = [

  {
    path: 'Teams',
    loadChildren: () => import('./Teams/teams.module').then(m => m.TeamsModule) , data:
    {
      title: 'Teams'
  
    }
  },

  {
    path: 'Home',
    component: HomeComponent ,
    pathMatch : 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


