import {  Component, OnInit, ViewChild } from '@angular/core';
import { TeamsService } from '../teams.service';
import { ToastrTranslateService } from 'src/app/Shard/Services/toastr-translate.service';
import { ActivatedRoute } from '@angular/router';
import { GetTeamDetailsResponse } from '../DTO/GetTeamDetailsResponse';
import { GetAllTeamMemberModel } from '../DTO/GetAllTeamMemberModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GetAllTeamModel } from '../DTO/GetAllTeamModel';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditMemberDialogComponent } from '../Dialog/add-edit-member-dialog/add-edit-member-dialog.component';
import { GetScheduleTeamResponse } from 'src/app/Schedule/DTO/GetScheduleTeamResponse';
import { GetScheduleTeamModel } from 'src/app/Schedule/DTO/GetScheduleTeamModel';
import { TeamScheduleService } from 'src/app/Schedule/Service/team-schedule.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit  {
  teamId! : number;
  TeamDetailsData! : GetTeamDetailsResponse;
  teamScheduleData! : GetScheduleTeamModel[];
  teamData! : GetAllTeamModel;

  displayedColumns: string[] = [ 'Id','name','position' , 'number' , 'creationDate'];
  dataSource = new MatTableDataSource<GetAllTeamMemberModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterObj = {value: "", key: ""};

  namefilter = "";
  positionfilter = "";

  shownamefilter: boolean = false;
  showpositionfilter: boolean = false;

  constructor(private teamsService : TeamsService ,
        private Toastr : ToastrTranslateService ,
        private route: ActivatedRoute ,
        private matDialog: MatDialog,
        private teamScheduleService : TeamScheduleService ) { }


  ngOnInit(): void {
    this.teamId = Number( this.route.snapshot.paramMap.get('id'));
    this.GetTeamDataDetails(this.teamId);
    this.GetTeamSchedule(this.teamId);
  }

  GetTeamDataDetails(id : number){
    this.teamsService.GetTeamDataDetails(id).subscribe((result : any) =>{
      this.TeamDetailsData =  result as GetTeamDetailsResponse;
      this.teamData = this.TeamDetailsData.teamDetails;
      console.log("TeamDetailsData : " , this.TeamDetailsData);
      this.creationTable( this.TeamDetailsData.teamMembers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err =>{
      this.Toastr.error("Error");
    })
  }

  GetTeamSchedule(id : number){
    this.teamScheduleService.GetTeamScheduleData(id).subscribe((result : any) =>{
      debugger
      
      this.teamScheduleData =  (result as GetScheduleTeamResponse).items;

      console.log("TeamScheduleData" , this.teamScheduleData);
      /*
      this.teamData = this.TeamDetailsData.teamDetails;
      this.creationTable( this.TeamDetailsData.teamMembers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;*/
    },err =>{
      this.Toastr.error("Error");
    })
  } 

  creationTable = (data : GetAllTeamMemberModel[]) => {
    this.dataSource.data = data as GetAllTeamMemberModel[];
    this.dataSource.filterPredicate = (data : any, filter : any) => {
      if (data[this.filterObj['key']] && this.filterObj['key']) {
        return data[this.filterObj['key']].toLowerCase().includes(this.filterObj['value']);
      }
      return false;
    }
  }
  showFilter = (key : any) => {
    this.namefilter = "";
    this.positionfilter = "";
    this.dataSource.filter = "";
    
    switch (key) {
      case "name":
        this.shownamefilter = !this.shownamefilter;
        this.showpositionfilter = false;

        break;

      case "position":
        this.showpositionfilter = !this.showpositionfilter;
        this.shownamefilter = false;
        break;
    }
  }

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

  refreshTable(IsEdit : Number , newRow : GetAllTeamMemberModel){
    if (IsEdit == 0) {
      newRow.creationDate = new Date();
      this.dataSource.data.unshift(newRow);
    }
    else {
      let data = this.dataSource.data as GetAllTeamMemberModel[]
      let itemIndex = data.findIndex(item => item.id === newRow.id);
      newRow.creationDate = data[itemIndex].creationDate;
      data[itemIndex] = newRow;
      this.dataSource.data = data;
    }
  }

  OpenMemberDialog(memberId : number){
    const config = new MatDialogConfig();
    //Add
    if(memberId == 0)
         config.data = { memberId:  memberId ,  teamId: this.teamId  };
    else{
      let data = this.dataSource.data as GetAllTeamMemberModel[]
      let itemIndex = data.findIndex(item => item.id === memberId);
      let EditData = data[itemIndex];
      config.data = { memberId:  memberId ,  teamId: this.teamId  ,  editData : EditData};
    }
        

    config.hasBackdrop = true;
    config.disableClose = true;
    config.autoFocus = false;
    const dialogeRef = this.matDialog.open(AddEditMemberDialogComponent, config);
    dialogeRef.afterClosed().subscribe((res : any) => {
    if(res){
      this.refreshTable(res.isEdit ,res.data as GetAllTeamMemberModel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
   });
  
  }

  AddMember(){
     this.OpenMemberDialog(0);
  }

  EditMember(memberId : number){
    this.OpenMemberDialog(memberId);
  }

 }
