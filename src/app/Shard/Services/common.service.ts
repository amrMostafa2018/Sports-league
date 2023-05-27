import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {  Inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CommonService {
 
  subjectGetMedicalData:Subject<any> = new Subject<any>();
 
  IsUrlTriage:boolean = false;
  IsUrlExamination:boolean = false;
  
  Setup =0 ;
  SelectedPage ='';
  SelectedLanguage ='en';
  ShortCutMenu =0;
  CentralIndexURL ='';
  IsAmbulance :boolean = false ;
  


   subjectSaveData =new Subject<any>();
   GlasgowcomaScaleForm! : FormGroup;

   loadSecurityData=new Subject<any>();


   MedicalDataAmbulanceForm! :FormGroup;
 
  http: any;

   constructor(public translate : TranslateService ,private formBuilder: FormBuilder
    ,@Inject(DOCUMENT) private documentT: Document  ,
    private spinner: NgxSpinnerService,
    private _http:HttpClient,
    private router : Router ,
    ){}
    
      

  

   public  GetSessionValue(key: string): string {
    return sessionStorage.getItem(key)
      ? sessionStorage.getItem(key)!.toString() 
      : '';
  }


  MapObjToNgSelect2(Data:any , textSelect : string ){
    let DataMap: { id: string; text: string }[] = [];
    DataMap.push({ id: 'null', text: textSelect});

    Data.forEach((element : any) => {
      DataMap.push({
        id: element.text.toString(),
        text:
          element.value.toString() 
      });
    });
    return DataMap;
  }

  toggleLanguage(){

    this.spinner.show();
    if( this.SelectedLanguage == "ar"){
      this.SelectedLanguage = "en";
      this.useLanguage("en");
    }
    else{
      this.SelectedLanguage = "ar";
      this.useLanguage("ar"); 
    }
 
    this.spinner.hide();
  }


  //#region Localization
  loadStyle2(styleName: string ,theme :string ,Language :string ) {
  return new Promise((resolve, reject) => {
    debugger;
    const head = this.documentT.getElementsByTagName('head')[0];
    //'Arabic-theme'
    let themeLink = this.documentT.getElementById(
      `${theme}`
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.documentT.createElement('link');
      style.id =`${theme}`;
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      head.appendChild(style);
     
    }
  });
}


  loadStyle(styleName: string ,theme :string ,Language :string ) {
    debugger;
    const head = this.documentT.getElementsByTagName('head')[0];
    //'Arabic-theme'
    let themeLink = this.documentT.getElementById(
      `${theme}`
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.documentT.createElement('link');
      style.id =`${theme}`;
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      head.appendChild(style);
     
    }
    if(Language == 'ar' ){
    //  this.removeStyleEN();
    }else{
     this.removeStyle();
    }
  }

  removeStyle() {
    const head = this.documentT.getElementsByTagName('head')[0];
    let themeLink = this.documentT.getElementById('Arabic-theme') as HTMLLinkElement;
    head.removeChild(themeLink)
  
 
  }

  removeStyleEN() {
    const head = this.documentT.getElementsByTagName('head')[0];
    let themeLink = this.documentT.getElementById('English-theme') as HTMLLinkElement;
    head.removeChild(themeLink)  
    
  }


useLanguage(language: any) {
  
 // this.removeTheme();
  if(language == 'ar'){

   this.documentT.documentElement.setAttribute('lang' ,"ar");
   this.documentT.documentElement.setAttribute('dir', 'rtl');
   this.loadStyle("./assets/Arabic.css","Arabic-theme" , language );


    }
  else{
  
    this.documentT.documentElement.setAttribute('lang' ,"en");
    this.documentT.documentElement.setAttribute('dir', 'ltr');
   // this.loadStyle("/assets/English.css","English-theme" , language);
    this.removeStyle();
   
  }  
  // set default language 
   this.translate.setDefaultLang(language);
 // this.translate.use(language).toPromise();
   this.translate.use(language);
}
getCurrentLang() {
  return this.translate.currentLang.toLocaleLowerCase();
}

checkEnglishLang() {
  return this.translate.currentLang.toLocaleLowerCase() == 'en';
}





numberOnly(event: any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}



}






