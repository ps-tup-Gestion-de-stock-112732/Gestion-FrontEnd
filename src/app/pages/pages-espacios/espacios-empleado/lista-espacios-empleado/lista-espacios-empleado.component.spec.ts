import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEspaciosEmpleadoComponent } from './lista-espacios-empleado.component';

describe('ListaEspaciosEmpleadoComponent', () => {
  let component: ListaEspaciosEmpleadoComponent;
  let fixture: ComponentFixture<ListaEspaciosEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEspaciosEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEspaciosEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
