import { Injectable } from '@angular/core';
import { AppConfig } from '../Shard/Configuration/app.config';
import { TeamMemberRequest } from './DTO/TeamMemberRequest';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  constructor(private http: HttpClient) { }

  AddTeamMemberData(data : TeamMemberRequest){
    return this.http.post(AppConfig.settings.apiServer.url + "team-member" , data );
  }

  EditTeamMemberData(data : TeamMemberRequest){
    return this.http.put(AppConfig.settings.apiServer.url + "team-member" , data );
  }
}
