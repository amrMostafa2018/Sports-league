import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-left-setup',
  templateUrl: './left-setup.component.html',
  styleUrls: ['./left-setup.component.css']
})
export class LeftSetupComponent implements OnInit {
  shwoSetting : boolean = false;
  constructor(private router : Router  ) { }

  ngOnInit(): void {
  }

}
