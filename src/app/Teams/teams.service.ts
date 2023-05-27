import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../Shard/Configuration/app.config';
import { TeamRequest } from './DTO/TeamRequest';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }

  GetTeamsData(){
    return this.http.get(AppConfig.settings.apiServer.url + "teams" );
  }

  GetTeamDataDetails(id : number){
    return this.http.get(AppConfig.settings.apiServer.url + "teams/"+ id );
  }

  AddTeamData(data : TeamRequest){
    return this.http.post(AppConfig.settings.apiServer.url + "teams" , data );
  }

  EditTeamData(data : TeamRequest){
    return this.http.put(AppConfig.settings.apiServer.url + "teams" , data );
  }
}
