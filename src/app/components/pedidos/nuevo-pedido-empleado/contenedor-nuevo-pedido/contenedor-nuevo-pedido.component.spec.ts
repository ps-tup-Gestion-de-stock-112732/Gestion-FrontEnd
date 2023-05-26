import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorNuevoPedidoComponent } from './contenedor-nuevo-pedido.component';

describe('ContenedorNuevoPedidoComponent', () => {
  let component: ContenedorNuevoPedidoComponent;
  let fixture: ComponentFixture<ContenedorNuevoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorNuevoPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorNuevoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
