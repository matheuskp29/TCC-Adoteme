import { TestBed } from '@angular/core/testing';

import { RelatoriosStoreService } from './relatorios-store.service';

describe('RelatoriosStoreService', () => {
  let service: RelatoriosStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatoriosStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
