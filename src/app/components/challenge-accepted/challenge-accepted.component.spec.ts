import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeAcceptedComponent } from './challenge-accepted.component';

describe('ChallengeAcceptedComponent', () => {
  let component: ChallengeAcceptedComponent;
  let fixture: ComponentFixture<ChallengeAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeAcceptedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
