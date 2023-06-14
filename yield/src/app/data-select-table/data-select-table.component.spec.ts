import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSelectTableComponent } from './data-select-table.component';

describe('DataSelectTableComponent', () => {
  let component: DataSelectTableComponent;
  let fixture: ComponentFixture<DataSelectTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSelectTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSelectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
