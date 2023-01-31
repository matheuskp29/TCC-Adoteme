import { TestBed } from '@angular/core/testing';

import { ClienteStoreService } from './cliente-store.service';

describe('ClienteStoreService', () => {
  let service: ClienteStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
