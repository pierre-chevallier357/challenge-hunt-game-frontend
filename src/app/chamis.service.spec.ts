/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChamisService } from './chamis.service';

describe('Service: Chamis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChamisService]
    });
  });

  it('should ...', inject([ChamisService], (service: ChamisService) => {
    expect(service).toBeTruthy();
  }));
});
