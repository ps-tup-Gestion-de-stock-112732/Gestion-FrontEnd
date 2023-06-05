import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSolEmpleadoComponent } from './detalle-sol-empleado.component';

describe('DetalleSolEmpleadoComponent', () => {
  let component: DetalleSolEmpleadoComponent;
  let fixture: ComponentFixture<DetalleSolEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSolEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleSolEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
