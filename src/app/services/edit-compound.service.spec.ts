import { TestBed } from '@angular/core/testing';

import { EditCompoundService } from './edit-compound.service';

describe('EditCompoundService', () => {
  let service: EditCompoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCompoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
