import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorEspaciosEmpleadoComponent } from './contenedor-espacios-empleado.component';

describe('ContenedorEspaciosEmpleadoComponent', () => {
  let component: ContenedorEspaciosEmpleadoComponent;
  let fixture: ComponentFixture<ContenedorEspaciosEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorEspaciosEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorEspaciosEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
