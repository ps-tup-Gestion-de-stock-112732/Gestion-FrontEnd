import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReservasEmpleadoComponent } from './lista-reservas-empleado.component';

describe('ListaReservasEmpleadoComponent', () => {
  let component: ListaReservasEmpleadoComponent;
  let fixture: ComponentFixture<ListaReservasEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaReservasEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaReservasEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
