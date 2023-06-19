import { TestBed } from '@angular/core/testing';

import { TradeReportService as TradeRecordService } from './trade-record.service';

describe('TradeReportService', () => {
  let service: TradeRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
