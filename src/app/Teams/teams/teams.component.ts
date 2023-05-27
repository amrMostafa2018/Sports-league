import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TeamsService } from '../teams.service';
import { GetAllTeamsResponse } from '../DTO/GetAllTeamsResponse';
import { ToastrTranslateService } from 'src/app/Shard/Services/toastr-translate.service';
import { GetAllTeamModel } from '../DTO/GetAllTeamModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  displayedColumns: string[] = [ 'Id','eye','name','city' , 'coach' , 'creationDate'];
  dataSource = new MatTableDataSource<GetAllTeamModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterObj = {value: "", key: ""};
  teamsData! : GetAllTeamsResponse;
  itemEdit! : GetAllTeamModel;
  namefilter = "";
  cityfilter = "";

  shownamefilter: boolean = false;
  showcityfilter: boolean = false;

  constructor(private teamsService :  TeamsService ,
             private Toastr : ToastrTranslateService ,
             private router: Router) { }

  ngOnInit(): void {
    this.GetTeams();
  }

  GetTeams(){

    this.teamsService.GetTeamsData().subscribe((result : any) =>{
      this.teamsData = result as GetAllTeamsResponse;
      this.creationTable( this.teamsData.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err =>{
      this.Toastr.error("Error");
    })
  }

  creationTable = (data : GetAllTeamModel[]) => {
    this.dataSource.data = data as GetAllTeamModel[];
    this.dataSource.filterPredicate = (data : any, filter : any) => {
      if (data[this.filterObj['key']] && this.filterObj['key']) {
        return data[this.filterObj['key']].toLowerCase().includes(this.filterObj['value']);
      }
      return false;
    }
  }
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

  refreshTable(IsEdit : Number , newRow : GetAllTeamModel){
    if (IsEdit == 0) {
      newRow.creationDate = new Date();
      this.dataSource.data.unshift(newRow);
    }
    else {
      let data = this.dataSource.data as GetAllTeamModel[]
      let itemIndex = data.findIndex(item => item.id === newRow.id);
      newRow.creationDate = data[itemIndex].creationDate;
      data[itemIndex] = newRow;
      this.dataSource.data = data;
    }
  }

   
  fillData = (item : GetAllTeamModel) => {
         this.itemEdit = item; 
  }

  ViewDetils(element : GetAllTeamModel){
      this.router.navigate( ['/Teams/details/', element.id]);
  }



}
