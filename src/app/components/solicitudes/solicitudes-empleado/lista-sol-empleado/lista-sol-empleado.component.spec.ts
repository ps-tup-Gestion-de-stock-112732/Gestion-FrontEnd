import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSolEmpleadoComponent } from './lista-sol-empleado.component';

describe('ListaSolEmpleadoComponent', () => {
  let component: ListaSolEmpleadoComponent;
  let fixture: ComponentFixture<ListaSolEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSolEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSolEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
