import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetScheduleTeamModel } from '../../../Schedule/DTO/GetScheduleTeamModel';

@Component({
  selector: 'app-team-schedule',
  templateUrl: './team-schedule.component.html',
  styleUrls: ['./team-schedule.component.css']
})
export class TeamScheduleComponent implements OnInit {
  @Input() TeamScheduleData!: GetScheduleTeamModel[] ;
  @Input() teamId!: number ;

  displayedColumns: string[] = [ 'Id','HomeTeam','AwayTeam'  , 'ScheduleDate'];
  dataSource = new MatTableDataSource<GetScheduleTeamModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterObj = {value: "", key: ""};

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['TeamScheduleData'].currentValue ){
      debugger
     console.log("TeamScheduleData : " , this.TeamScheduleData)
     this.creationTable( this.TeamScheduleData);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
    }

}

creationTable = (data : GetScheduleTeamModel[]) => {
  this.dataSource.data = data as GetScheduleTeamModel[];
  this.dataSource.filterPredicate = (data : any, filter : any) => {
    if (data[this.filterObj['key']] && this.filterObj['key']) {
      return data[this.filterObj['key']].toLowerCase().includes(this.filterObj['value']);
    }
    return false;
  }
}

}
