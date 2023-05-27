import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders, HttpEventType } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConfig } from '../Configuration/app.config';
import { LoggingService } from './logging-service ';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  LoginURL = AppConfig.settings.apiServer.loginUrl;
  counter: number = 0;

  constructor(private router: Router, private logger: LoggingService, public toastr: ToastrService, private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.counter++;
    this.spinner.show();
    if (req.headers.get("skip"))// JUST to skip interceptor for some URLS
      return next.handle(req);

    let request = req.clone({
      setHeaders: {
       // 'Authorization': `${localStorage.getItem('token') || ''}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        //'Accept-Language': localStorage.getItem("CurrLang")
        //'Content-Type': 'application/x-www-form-urlencoded',
        //'Content-Type': 'application/json;',
      },
      //withCredentials: true
    });
    return next.handle(request).pipe(
      // retry(1),// retry request one more time before catch
      catchError((err, caught: Observable<HttpEvent<any>>) => {
       debugger
        
        if (err instanceof HttpErrorResponse && err.status == 401) {// Unauthorized

          this.toastr.error("401: Unauthorized User")
          this.logger.logError(err.message, "")
          console.log(err.message);

          setTimeout(() => {
            document.location.href = AppConfig.settings.apiServer.loginUrl;
          }, 1000);
          return of(err as any);
        }

         if (err instanceof HttpErrorResponse && err.status == 500) {
          this.toastr.error("Internal Server Error 500")
          this.logger.logError(err.message, "")
          //return of(err as any);
        }

         if (err instanceof HttpErrorResponse && err.status == 404) {
          if(err.url?.indexOf("i18n") == -1)
             this.toastr.error("Error 404");
          if(err.error){
            this.toastr.error(err.error.errorMessage); 
          }
          this.logger.logError(err.message, "")
          //return of(err as any);
        }
        if(err instanceof HttpErrorResponse && err.status == 409){
          if(err.error){
            this.toastr.error(err.error.errorMessage); 
          }
        
        }
        this.counter--
        if (this.counter == 0) {
          this.spinner.hide();
        }
        this.logger.logError(err.message, "")
        throw err;
      }), tap(event => {

        this.spinner.show();

        if (event.type == HttpEventType.Response) {

          this.counter--

          if (this.counter == 0) {
            this.spinner.hide();
          }


        }
      })
    );
  }
}
