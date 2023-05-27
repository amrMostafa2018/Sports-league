import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material/material.module';
import { NgSelect2Module } from 'ng-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { MAT_DATE_LOCALE } from '@angular/material/core';


const DATE_TIME_FORMAT = {
  parse: {
    dateInput: 'DD-MM-YYYY hh:mm A ',
    //dateInput: 'l, LT',
  },
  display: {
  //  dateInput: 'YYYY-MM-DD HH:mm:ss ',
    dateInput: 'DD-MM-YYYY hh:mm A ',
    monthYearLabel: 'MM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    NgSelect2Module,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  exports:[TranslateModule 
    ,MaterialModule,NgSelect2Module 
     ,ReactiveFormsModule, 
     ReactiveFormsModule,
     FormsModule
 
   ]
  ,providers:[
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT},
    { provide: LOCALE_ID, useValue: "en-GB" } ,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } } 
  ]
})
export class CommonDirectiveModule { }
