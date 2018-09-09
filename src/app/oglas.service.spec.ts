import { TestBed, inject } from '@angular/core/testing';

import { OglasService } from './oglas.service';

describe('OglasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OglasService]
    });
  });

  it('should be created', inject([OglasService], (service: OglasService) => {
    expect(service).toBeTruthy();
  }));
});
