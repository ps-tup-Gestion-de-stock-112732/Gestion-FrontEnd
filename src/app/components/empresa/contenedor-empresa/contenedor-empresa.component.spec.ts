import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorEmpresaComponent } from './contenedor-empresa.component';

describe('ContenedorEmpresaComponent', () => {
  let component: ContenedorEmpresaComponent;
  let fixture: ComponentFixture<ContenedorEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
