/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChamiService } from './chami.service';

describe('Service: Chami', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChamiService]
    });
  });

  it('should ...', inject([ChamiService], (service: ChamiService) => {
    expect(service).toBeTruthy();
  }));
});
