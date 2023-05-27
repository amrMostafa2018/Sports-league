import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSetupComponent } from './left-setup.component';

describe('LeftSetupComponent', () => {
  let component: LeftSetupComponent;
  let fixture: ComponentFixture<LeftSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
