import { TestBed } from '@angular/core/testing';

import { TradeReportService } from './trade-report.service';

describe('TradeReportService', () => {
  let service: TradeReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
