import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ToastrTranslateService {
  ToasterPosition: string = 'toast-top-right'
  constructor(private Toastr: ToastrService, private CommonService: CommonService) { }


  success(message?: string) {
    this.ToasterPosition = this.CommonService.getCurrentLang() == 'ar' ? 'toast-top-left' : 'toast-top-right'
    return this.Toastr.success(this.Translate(message), "", { positionClass: this.ToasterPosition });
  }

  error(message?: string) {
    this.ToasterPosition = this.CommonService.getCurrentLang() == 'ar' ? 'toast-top-left' : 'toast-top-right'
    return this.Toastr.error(this.Translate(message), "", { positionClass: this.ToasterPosition });
  }

  warning(message?: string) {
    this.ToasterPosition = this.CommonService.getCurrentLang() == 'ar' ? 'toast-top-left' : 'toast-top-right'
    return this.Toastr.warning(this.Translate(message), "", { positionClass: this.ToasterPosition });
  }

  info(message?: string) {
    this.ToasterPosition = this.CommonService.getCurrentLang() == 'ar' ? 'toast-top-left' : 'toast-top-right'
    return this.Toastr.info(this.Translate(message), "", { positionClass: this.ToasterPosition });
  }
  private Translate(txt: any): string {
    let Message = this.CommonService.translate.instant("Toastr." + txt);
    return !this.CheckTranslateError(Message) ? Message : txt;
  }
  private CheckTranslateError(txt: string) {
    return txt.includes("Toastr.")
  }
}
