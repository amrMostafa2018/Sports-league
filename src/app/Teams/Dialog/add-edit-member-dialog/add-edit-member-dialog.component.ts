import { Component, OnInit ,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrTranslateService } from 'src/app/Shard/Services/toastr-translate.service';
import { TeamMemberRequest } from 'src/app/TeamMember/DTO/TeamMemberRequest';
import { TeamMemberService } from 'src/app/TeamMember/team-member.service';
import { GetAllTeamMemberModel } from '../../DTO/GetAllTeamMemberModel';

@Component({
  selector: 'app-add-edit-member-dialog',
  templateUrl: './add-edit-member-dialog.component.html',
  styleUrls: ['./add-edit-member-dialog.component.css']
})
export class AddEditMemberDialogComponent implements OnInit {
  formAddEditTeamMember!: FormGroup;
  title : string = "";

  constructor(public dialogRef: MatDialogRef<AddEditMemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private teamMemberService : TeamMemberService,
              private Toastr : ToastrTranslateService ) { }

  ngOnInit(): void {
    this.CreateForm();
    if(this.data.memberId == 0){
       this.title = "Add Team Member";
    }else{
      this.title = "Edit Team Member";
      this.patchValues(this.data.editData);
    }

  }

  CreateForm() {
    this.formAddEditTeamMember = new FormGroup({
       'id' : new FormControl(0), 
       'name': new FormControl(null, Validators.required),
       'position': new FormControl(null, Validators.required),
       'number' : new FormControl(null, Validators.required),
    })
  }

  patchValues(item : GetAllTeamMemberModel){
    this.formAddEditTeamMember.patchValue({
      id : item.id,
      name : item.name,
      position : item.position,
      number: item.number
    });
  }


  SaveData(){
    let data =  this.formAddEditTeamMember.value as TeamMemberRequest;
    data.teamId = this.data.teamId;
    if(this.data.memberId == 0)
       this.AddTeamMemberData(data);
    else
       this.EditTeamMemberData(data);
  }

  AddTeamMemberData(data : TeamMemberRequest){
    this.teamMemberService.AddTeamMemberData(data).subscribe(newItemId =>{
      data.id = newItemId as number;
      let newRow = {data : data , isEdit : 0};
      this.dialogRef.close(newRow);
       this.CreateForm();
      this.Toastr.success("Save successfully");
    },err=>{
      this.Toastr.error("Error");
    })
  }

  EditTeamMemberData(data : TeamMemberRequest){
    this.teamMemberService.EditTeamMemberData(data).subscribe(res =>{
       let newRow = {data : data , IsEdit : 1};
       this.dialogRef.close(newRow);
        this.CreateForm();
       this.Toastr.success("Save successfully");
    },err=>{
      this.Toastr.error("Error");
    })
  }

  CloseDialog(){
      this.dialogRef.close();
    }
}
