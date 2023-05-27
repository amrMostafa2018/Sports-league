import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/Shard/Configuration/app.config';
import { TeamScheduleRequest } from '../DTO/TeamScheduleRequest';

@Injectable({
  providedIn: 'root'
})
export class TeamScheduleService {

  constructor(private http: HttpClient) { }

  GetScheduleData(){
    return this.http.get(AppConfig.settings.apiServer.url + "team-schedule" );
  }

  GetTeamScheduleData(temaId :  number){
    return this.http.get(AppConfig.settings.apiServer.url + "team-schedule/" + temaId );
  }

  AddScheduleData(data : TeamScheduleRequest){
    return this.http.post(AppConfig.settings.apiServer.url + "team-schedule" ,data);
  }
}
