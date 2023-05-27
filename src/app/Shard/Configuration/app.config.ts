import { environment } from './../../../environments/environment';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppConfig } from '../Interface/app-config.model';
import { LoadScriptService } from '../Services/load-script.service';
import { CommonService } from '../Services/common.service';

@Injectable()
export abstract class ConfigServiceBase {

    public baseHref: string = '/';
    abstract load():void;
}


@Injectable()
export class AppConfig  implements ConfigServiceBase {
    static settings: IAppConfig;
    public baseHref!: string;

    constructor(private http: HttpClient ,private handler: HttpBackend , private LoadScript : LoadScriptService
         ) {}
    load() {
        //debugger
        const jsonFile = `assets/config/config.${environment.name}.json`;
        return new HttpClient(this.handler).get(jsonFile)
        .toPromise()
        .then((data) => {
          AppConfig.settings = <IAppConfig>data;
         // this.LoadScript.loadStyle("/assets/English.css","English-theme");
          this.LoadScript.loadScripts()
         

        }).catch((response: any) =>{
          console.log(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
        });
    
    /*
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response ) => {
                debugger;
               AppConfig.settings = <IAppConfig>response;
               this.baseHref = AppConfig.settings.apiServer.baseHref ;
               resolve();
               this.LoadScript.loadScripts()

            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });*/
    }
}