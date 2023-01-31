import { TestBed } from '@angular/core/testing';

import { AnuncioStoreService } from './anuncio-store.service';

describe('AnuncioStoreService', () => {
  let service: AnuncioStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnuncioStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
