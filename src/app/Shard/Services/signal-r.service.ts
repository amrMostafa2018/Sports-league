import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { AppConfig } from '../Configuration/app.config';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection:any//:signalR.HubConnection=new signalR.HubConnectionBuilder().withUrl("").build();

  constructor() { }

  startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
        //.withUrl("http://localhost:5288/signalR")
        .withUrl(`${AppConfig.settings.apiServer.url.replace('api/','signalR')}`)
        .build();

    this.hubConnection.start()
          .then(()=>console.warn("signalR connection started"))
          .catch((err:any)=>console.error("error in signalR connection :"+err))
  }
  CountOfDoctorCalled:number=0;
  CountOfOrderCreated:number=0;
  doctorCallListener(){
    this.hubConnection.on("doctorCalled",(data:any)=>{
      //console.warn("=> signalR  :" ,data)
      this.CountOfDoctorCalled=data;
    })
  }
  doctorCall(HospitalCode:string){
    this.hubConnection.invoke("doctorCalled",HospitalCode).catch((err:any)=>console.error("error in invoke doctor called signalr : "+err));
  }
  OrderListener(){
    this.hubConnection.on("orderCreated",(data:any)=>{
      this.CountOfOrderCreated=data as number;
    })
  }
  OrderCall(HospitalCode:string){
    this.hubConnection.invoke("orderCreated",HospitalCode).catch((err:any)=>console.error("error in invoke order count "+err));
  }

}
