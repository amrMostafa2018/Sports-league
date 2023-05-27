import { Injectable } from '@angular/core';
import { AppConfig } from '../Shard/Configuration/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamScheduleService {

  constructor(private http: HttpClient) { }

  GetTeamScheduleData(temaId :  number){
    return this.http.get(AppConfig.settings.apiServer.url + "team-schedule/" + temaId );
  }
}
