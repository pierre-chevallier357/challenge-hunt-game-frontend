/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DefiForm2Component } from './defi-form2.component';

describe('DefiForm2Component', () => {
  let component: DefiForm2Component;
  let fixture: ComponentFixture<DefiForm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefiForm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefiForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
