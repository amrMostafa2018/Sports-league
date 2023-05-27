import { TestBed } from '@angular/core/testing';

import { TeamScheduleService } from './team-schedule.service';

describe('TeamScheduleService', () => {
  let service: TeamScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
