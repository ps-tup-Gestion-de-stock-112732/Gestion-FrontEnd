import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorSolVentasComponent } from './contenedor-sol-ventas.component';

describe('ContenedorSolVentasComponent', () => {
  let component: ContenedorSolVentasComponent;
  let fixture: ComponentFixture<ContenedorSolVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorSolVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorSolVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
