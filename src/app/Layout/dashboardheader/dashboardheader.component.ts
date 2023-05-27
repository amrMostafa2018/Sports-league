import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-dashboardheader',
  templateUrl: './dashboardheader.component.html',
  styleUrls: ['./dashboardheader.component.css']
})
export class DashboardheaderComponent implements OnInit {
  displayDashboard: boolean = false;
  CountOfOrder:number=0
  subscribe_loadCountOfCaseAndOrder:any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
