import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Shard/Services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

 

  constructor(public Commonservice:CommonService ,private router : Router) { 



  }

  ngOnInit(): void{};
 
  

}

