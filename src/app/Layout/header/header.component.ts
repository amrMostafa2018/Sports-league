import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadScriptService } from 'src/app/Shard/Services/load-script.service';
import { CommonService } from '../../Shard/Services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  CurrentLang:string = '';
  constructor(public commandService: CommonService ,
     private router : Router,
     private  loadScriptService : LoadScriptService ) { }

  ngOnInit(): void {
  }



  

}
