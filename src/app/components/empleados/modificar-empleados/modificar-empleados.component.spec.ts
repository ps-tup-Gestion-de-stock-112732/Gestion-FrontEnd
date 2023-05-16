import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEmpleadosComponent } from './modificar-empleados.component';

describe('ModificarEmpleadosComponent', () => {
  let component: ModificarEmpleadosComponent;
  let fixture: ComponentFixture<ModificarEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarEmpleadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
