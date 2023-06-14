import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketResultComponent } from './market-result.component';

describe('MarketResultComponent', () => {
  let component: MarketResultComponent;
  let fixture: ComponentFixture<MarketResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
