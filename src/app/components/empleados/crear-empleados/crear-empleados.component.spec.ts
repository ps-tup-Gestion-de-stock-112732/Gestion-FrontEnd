import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEmpleadosComponent } from './crear-empleados.component';

describe('CrearEmpleadosComponent', () => {
  let component: CrearEmpleadosComponent;
  let fixture: ComponentFixture<CrearEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEmpleadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
