import { TestBed } from '@angular/core/testing';

import { SolicitudGestionService } from './solicitud-gestion.service';

describe('SolicitudGestionService', () => {
  let service: SolicitudGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
