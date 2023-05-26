import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNuevoPedidoComponent } from './crear-nuevo-pedido.component';

describe('CrearNuevoPedidoComponent', () => {
  let component: CrearNuevoPedidoComponent;
  let fixture: ComponentFixture<CrearNuevoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearNuevoPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNuevoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
