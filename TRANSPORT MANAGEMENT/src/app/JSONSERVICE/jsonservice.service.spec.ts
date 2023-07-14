import { TestBed } from '@angular/core/testing';

import { JsonserviceService } from './jsonservice.service';

describe('JsonserviceService', () => {
  let service: JsonserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
