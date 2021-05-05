/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DefiResultComponent } from './defi-result.component';

describe('DefiResultComponent', () => {
  let component: DefiResultComponent;
  let fixture: ComponentFixture<DefiResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefiResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefiResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
