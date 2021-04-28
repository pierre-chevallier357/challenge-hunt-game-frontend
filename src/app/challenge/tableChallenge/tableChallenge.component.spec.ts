import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChallengeComponent } from './tableChallenge.component';

describe('TableChallengeComponent', () => {
  let component: TableChallengeComponent;
  let fixture: ComponentFixture<TableChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
