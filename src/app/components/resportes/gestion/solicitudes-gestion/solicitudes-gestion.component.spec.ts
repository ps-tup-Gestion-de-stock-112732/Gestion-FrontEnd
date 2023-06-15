import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesGestionComponent } from './solicitudes-gestion.component';

describe('SolicitudesGestionComponent', () => {
  let component: SolicitudesGestionComponent;
  let fixture: ComponentFixture<SolicitudesGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
