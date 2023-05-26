import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorPedidosProveedorComponent } from './contenedor-pedidos-proveedor.component';

describe('ContenedorPedidosProveedorComponent', () => {
  let component: ContenedorPedidosProveedorComponent;
  let fixture: ComponentFixture<ContenedorPedidosProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorPedidosProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorPedidosProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
