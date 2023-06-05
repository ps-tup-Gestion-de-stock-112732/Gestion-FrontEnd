import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedidosProveedorComponent } from './lista-pedidos-proveedor.component';

describe('ListaPedidosProveedorComponent', () => {
  let component: ListaPedidosProveedorComponent;
  let fixture: ComponentFixture<ListaPedidosProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPedidosProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPedidosProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
