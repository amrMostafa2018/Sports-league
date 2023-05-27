import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { HomeComponent } from './Layout/home/home.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LeftSetupComponent } from './Layout/left-setup/left-setup.component';
import { AppConfig ,ConfigServiceBase } from './Shard/Configuration/app.config';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardheaderComponent } from './Layout/dashboardheader/dashboardheader.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorInterceptor } from './Shard/Services/error-interceptor';
import { CommonDirectiveModule } from './Shard/common-directive/common-directive.module';
import { ConfirmDialogComponent } from './Shard/Components/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LeftSetupComponent,
    DashboardheaderComponent,
    ConfirmDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    CommonDirectiveModule,
    NgxSpinnerModule,

    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: CreateTranslateLoader,
        deps: [HttpClient]
      }

    })
  
  ],
  
  providers: [
    DatePipe,
    AppConfig,
    {provide: ConfigServiceBase , useClass: AppConfig },
    {provide: APP_INITIALIZER,useFactory: initializeApp,deps: [ConfigServiceBase], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: 'BASE_URL', useFactory: getBaseUrl ,deps: [ConfigServiceBase]}

  
  ],
  bootstrap: [AppComponent]

 
})
export class AppModule { }

export function CreateTranslateLoader(http: HttpClient) {
 return new TranslateHttpLoader(http, './assets/i18n/','.json' )
}

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

export function getBaseUrl(appConfig: AppConfig) {
  debugger;
  //alert(appConfig.baseHref);
  //console.log('BaseHref: ' + appConfig.baseHref);
  //return appConfig.baseHref;

  return document.getElementsByTagName('base')[0].href;
}


