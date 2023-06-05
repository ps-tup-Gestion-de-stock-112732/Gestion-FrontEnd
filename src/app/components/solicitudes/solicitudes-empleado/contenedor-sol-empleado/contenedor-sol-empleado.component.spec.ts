import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorSolEmpleadoComponent } from './contenedor-sol-empleado.component';

describe('ContenedorSolEmpleadoComponent', () => {
  let component: ContenedorSolEmpleadoComponent;
  let fixture: ComponentFixture<ContenedorSolEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorSolEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorSolEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
