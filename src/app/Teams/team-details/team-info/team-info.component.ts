import { Component, Input, OnInit } from '@angular/core';
import { GetAllTeamModel } from '../../DTO/GetAllTeamModel';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
  @Input() TeamData!: GetAllTeamModel ;

  constructor() { }

  ngOnInit(): void {
  }

}
