import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorEmpleadosComponent } from './contenedor-empleados.component';

describe('ContenedorEmpleadosComponent', () => {
  let component: ContenedorEmpleadosComponent;
  let fixture: ComponentFixture<ContenedorEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorEmpleadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
