import { TestBed } from '@angular/core/testing';

import { DataHelperService } from './data-helper.service';

describe('DataHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataHelperService = TestBed.get(DataHelperService);
    expect(service).toBeTruthy();
  });
});
