import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule ,
    MatSortModule,
    MatRadioModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    MatCheckboxModule
    
    
    
    
    
    
  ],
  exports:[
    DragDropModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule ,
    MatSortModule,
    MatRadioModule,
   MatDatepickerModule,
   MatNativeDateModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMaterialTimepickerModule,
    NgxMatMomentModule,
    MatCheckboxModule
              
    
    
  ]

})
export class MaterialModule { }



