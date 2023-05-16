import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorProveedoresComponent } from './contenedor-proveedores.component';

describe('ContenedorProveedoresComponent', () => {
  let component: ContenedorProveedoresComponent;
  let fixture: ComponentFixture<ContenedorProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorProveedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
