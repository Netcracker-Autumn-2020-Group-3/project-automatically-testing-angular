import { TestBed } from '@angular/core/testing';

import { LibraryActionService } from './library-action.service';

describe('LibraryActionService', () => {
  let service: LibraryActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
