import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamScheduleRequest } from '../../DTO/TeamScheduleRequest';
import { TeamScheduleService } from '../../Service/team-schedule.service';
import { ToastrTranslateService } from 'src/app/Shard/Services/toastr-translate.service';
import { TeamsService } from 'src/app/Teams/teams.service';
import { GetAllTeamsResponse } from 'src/app/Teams/DTO/GetAllTeamsResponse';
import { GetAllTeamModel } from 'src/app/Teams/DTO/GetAllTeamModel';
import { GetScheduleTeamModel } from '../../DTO/GetScheduleTeamModel';

@Component({
  selector: 'app-add-edit-schedule',
  templateUrl: './add-edit-schedule.component.html',
  styleUrls: ['./add-edit-schedule.component.css']
})
export class AddEditScheduleComponent implements OnInit {

  formAddEditSchedule!: FormGroup;
  IsEdit: Number = 0;
  @Output() refreshTable = new EventEmitter<any>();
  ScheduleDate : Date = new Date();
  HomeTeams! : GetAllTeamModel[];
  AwayTeams! : GetAllTeamModel[];
  AllTeams! : GetAllTeamModel[];

  constructor( private teamScheduleService :  TeamScheduleService ,
               private Toastr : ToastrTranslateService , private teamsService : TeamsService) { }

  ngOnInit(): void {
    this.CreateForm();
    this.getTeams();
  }

  CreateForm() {
    this.formAddEditSchedule = new FormGroup({
       'id' : new FormControl(0), 
       'homeTeamId': new FormControl(null, Validators.required),
       'awayTeamId': new FormControl(null, Validators.required),
       'scheduleDate' : new FormControl(new Date(), Validators.required),
    })
    this.IsEdit = 0;
  }

  getTeams(){
    this.teamsService.GetTeamsData().subscribe(res =>{
         let data = res as GetAllTeamsResponse;
         this.HomeTeams = data.items;
         this.AwayTeams = data.items;
         this.AllTeams = data.items;
    },err=>{
      this.Toastr.error("Error");
    })
  }

  patchValues(item : TeamScheduleRequest){
    this.formAddEditSchedule.patchValue({
      id : item.id,
      homeTeamId : item.homeTeamId,
      awayTeamId : item.awayTeamId,
      scheduleDate: item.scheduleDate
    });
  }

  SaveData(){
    let data =  this.formAddEditSchedule.value as TeamScheduleRequest;
    if(this.IsEdit == 0)
       this.AddTeamSechuleData(data);

  }

  AddTeamSechuleData(data : TeamScheduleRequest){
    this.teamScheduleService.AddScheduleData(data).subscribe(newItemId =>{
      this.Toastr.success("Save successfully");
        data.id = newItemId as number;
        let object = data as unknown as GetScheduleTeamModel ; 
        object.homeTeam =  this.AllTeams.filter(n=>n.id == data.homeTeamId)[0].name;
        object.awayTeam =  this.AllTeams.filter(n=>n.id == data.awayTeamId)[0].name;
       let newRow = {data : data , IsEdit : this.IsEdit};
       this.refreshTable.emit(newRow);
       this.CreateForm();
    },err=>{
      this.Toastr.error("Error");
    })
  }


  changeTeam(homeTeamId:any ,awayTeamId : any){
       this.AwayTeams =  this.AllTeams;
       this.HomeTeams = this.AllTeams;
       this.AwayTeams = this.AwayTeams.filter(b=>b.id != homeTeamId);
       this.HomeTeams = this.HomeTeams.filter(h=>h.id != awayTeamId);
       if(awayTeamId == ""){
        this.formAddEditSchedule.patchValue({
          awayTeamId : this.AwayTeams.length > 0 ? this.AwayTeams[0].id : null
        })
       }

  }

 

}
