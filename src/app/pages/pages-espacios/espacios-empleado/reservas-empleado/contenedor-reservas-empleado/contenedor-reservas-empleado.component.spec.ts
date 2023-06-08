import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorReservasEmpleadoComponent } from './contenedor-reservas-empleado.component';

describe('ContenedorReservasEmpleadoComponent', () => {
  let component: ContenedorReservasEmpleadoComponent;
  let fixture: ComponentFixture<ContenedorReservasEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorReservasEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorReservasEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
