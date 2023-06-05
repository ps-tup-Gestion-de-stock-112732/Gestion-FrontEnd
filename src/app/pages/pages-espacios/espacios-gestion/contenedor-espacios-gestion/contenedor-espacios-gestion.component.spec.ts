import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorEspaciosGestionComponent } from './contenedor-espacios-gestion.component';

describe('ContenedorEspaciosGestionComponent', () => {
  let component: ContenedorEspaciosGestionComponent;
  let fixture: ComponentFixture<ContenedorEspaciosGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorEspaciosGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorEspaciosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
