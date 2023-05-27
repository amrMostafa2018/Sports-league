import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetScheduleTeamModel } from '../DTO/GetScheduleTeamModel';
import { GetScheduleTeamResponse } from '../DTO/GetScheduleTeamResponse';
import { ToastrTranslateService } from 'src/app/Shard/Services/toastr-translate.service';
import { TeamScheduleService } from '../Service/team-schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  displayedColumns: string[] = [ 'Id','HomeTeam','AwayTeam'  , 'ScheduleDate'];
  dataSource = new MatTableDataSource<GetScheduleTeamModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterObj = {value: "", key: ""};
  teamsScheduleData!: GetScheduleTeamResponse;


  constructor(private Toastr :  ToastrTranslateService ,
              private teamScheduleService :  TeamScheduleService) { }

  ngOnInit(): void {
    this.GetTeamsSchedule();
  }

  GetTeamsSchedule(){

    this.teamScheduleService.GetScheduleData().subscribe((result : any) =>{
      this.teamsScheduleData = result as GetScheduleTeamResponse;
      this.creationTable( this.teamsScheduleData.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err =>{
      this.Toastr.error("Error");
    })
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
  /*
  showFilter = (key : any) => {
    this.namefilter = "";
    this.cityfilter = "";
    this.dataSource.filter = "";
    
    switch (key) {
      case "name":
        this.shownamefilter = !this.shownamefilter;
        this.showcityfilter = false;

        break;

      case "city":
        this.showcityfilter = !this.showcityfilter;
        this.shownamefilter = false;
        break;
    }
  }
*/
  applyFilter(filterValue: any, key: string) {
    
    this.filterObj = {
      value: filterValue.value.trim().toLowerCase(),
      key: key
    }
    this.dataSource.filter = filterValue.value;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshTableData(data : any){
     this.refreshTable(data.IsEdit,data.data);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  refreshTable(IsEdit : Number , newRow : GetScheduleTeamModel){
    if (IsEdit == 0) {

      this.dataSource.data.unshift(newRow);
    }
    else {
      let data = this.dataSource.data as GetScheduleTeamModel[]
      let itemIndex = data.findIndex(item => item.id === newRow.id);
      data[itemIndex] = newRow;
      this.dataSource.data = data;
    }
  }


}
