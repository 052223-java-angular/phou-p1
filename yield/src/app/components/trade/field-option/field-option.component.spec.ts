import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldOptionComponent } from './field-option.component';

describe('FieldOptionComponent', () => {
  let component: FieldOptionComponent;
  let fixture: ComponentFixture<FieldOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
