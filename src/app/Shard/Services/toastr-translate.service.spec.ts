import { TestBed } from '@angular/core/testing';

import { ToastrTranslateService } from './toastr-translate.service';

describe('ToastrTranslateService', () => {
  let service: ToastrTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
