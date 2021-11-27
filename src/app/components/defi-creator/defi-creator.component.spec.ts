import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefiCreatorComponent } from './defi-creator.component';

describe('DefiCreatorComponent', () => {
  let component: DefiCreatorComponent;
  let fixture: ComponentFixture<DefiCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefiCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefiCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
