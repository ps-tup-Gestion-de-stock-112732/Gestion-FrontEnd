import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorPedidosEmpleadoComponent } from './contenedor-pedidos-empleado.component';

describe('ContenedorPedidosEmpleadoComponent', () => {
  let component: ContenedorPedidosEmpleadoComponent;
  let fixture: ComponentFixture<ContenedorPedidosEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorPedidosEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorPedidosEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
