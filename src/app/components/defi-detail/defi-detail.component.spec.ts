import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefiDetailComponent } from './defi-detail.component';

describe('DefiDetailComponent', () => {
  let component: DefiDetailComponent;
  let fixture: ComponentFixture<DefiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefiDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
