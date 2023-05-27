import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamRequest } from '../DTO/TeamRequest';
import { TeamsService } from '../teams.service';
import { ToastrTranslateService } from 'src/app/Shard/Services/toastr-translate.service';
import { GetAllTeamModel } from '../DTO/GetAllTeamModel';

@Component({
  selector: 'app-add-edit-team',
  templateUrl: './add-edit-team.component.html',
  styleUrls: ['./add-edit-team.component.css']
})
export class AddEditTeamComponent implements OnInit,OnChanges{
  formAddEditTeam!: FormGroup;
  IsEdit: Number = 0;
  @Output() refreshTable = new EventEmitter<any>();
  @Input() ItemEdit!: GetAllTeamModel ;

  constructor(private teamsService :  TeamsService , private Toastr : ToastrTranslateService ) { }


  ngOnChanges(changes: SimpleChanges): void {

       if(changes['ItemEdit'].currentValue ){
        console.log("IdItemEdit : " , this.ItemEdit)
        this.IsEdit = 1;
        this.patchValues(this.ItemEdit);
       }
    
  }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.formAddEditTeam = new FormGroup({
       'id' : new FormControl(0), 
       'name': new FormControl(null, Validators.required),
       'coach': new FormControl(null, Validators.required),
       'city' : new FormControl(null, Validators.required),
    })
    this.IsEdit = 0;
  }

  patchValues(item : GetAllTeamModel){
    this.formAddEditTeam.patchValue({
      id : item.id,
      name : item.name,
      coach : item.coach,
      city: item.city
    });
  }

  SaveData(){
    
    let data =  this.formAddEditTeam.value as TeamRequest;
    if(this.IsEdit == 0)
       this.AddTeamData(data);
    else
       this.EditTeamData(data);
  }

  AddTeamData(data : TeamRequest){
    this.teamsService.AddTeamData(data).subscribe(newItemId =>{
        data.id = newItemId as number;
       let newRow = {data : data , IsEdit : this.IsEdit};
       this.refreshTable.emit(newRow);
       this.CreateForm();
      this.Toastr.success("Save successfully");
    },err=>{
      this.Toastr.error("Error");
    })
  }

  EditTeamData(data : TeamRequest){
    this.teamsService.EditTeamData(data).subscribe(res =>{
       let newRow = {data : data , IsEdit : this.IsEdit};
       this.refreshTable.emit(newRow);
       this.CreateForm();
       this.IsEdit = 0;
      this.Toastr.success("Save successfully");
    },err=>{
      this.Toastr.error("Error");
    })
  }

}
