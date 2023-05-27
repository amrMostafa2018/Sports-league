import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad  {

  constructor(private router: Router , private Commonservice: CommonService) { }

   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /**Check Ambulance Or Emergency */
    let main = next.data['main'];
    let page = next.data['page'];
    if (sessionStorage.getItem("UserAuthorities") == null) return true;
    let enCodeAuths = atob(sessionStorage.getItem("UserAuthorities") || "[]");
    let auths = JSON.parse(enCodeAuths.toString()) as any;
    let currentmenu = auths.filter((s: { PAGE_TYPE: any; }) => s.PAGE_TYPE == main);
    let isExist = currentmenu.findIndex((s: { ENGLISH_NAME: string; }) => s.ENGLISH_NAME.toUpperCase() == page.toUpperCase());
    if (isExist != -1) return true;

    else {
      let route = state.url.split("/")[1];
      //Check Ambulance
   if(sessionStorage.getItem("Module") == "AMB"){
    this.router.navigate(["Ambulance-app/NotAuthorized"])

   }else{
    this.Commonservice.SelectedPage == 'Ambulance'
     //this.c
    if (route =='Settup') this.router.navigate(["NotAuthorized"]);
    else {
      this.router.navigate(["NotAuthorized"])
    };

   }
  
      return false;
    }

  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    let main = route.data?.['main'];
    let page = route.data?.['page'];
    if (sessionStorage.getItem("UserAuthorities") == null) return true;
    let enCodeAuths = atob(sessionStorage.getItem("UserAuthorities") || "[]");
    let auths = JSON.parse(enCodeAuths.toString()) as any;
    let currentmenu = auths.filter((s: { PAGE_TYPE: any; }) => s.PAGE_TYPE == main);
    let isExist = currentmenu.findIndex((s: { LEVEL_CODE: any; }) => s.LEVEL_CODE == page);
    if (isExist != -1) return true;
    else return false;
  }
}
