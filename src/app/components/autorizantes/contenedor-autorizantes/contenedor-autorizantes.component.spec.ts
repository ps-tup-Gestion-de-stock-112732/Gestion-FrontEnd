import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorAutorizantesComponent } from './contenedor-autorizantes.component';

describe('ContenedorAutorizantesComponent', () => {
  let component: ContenedorAutorizantesComponent;
  let fixture: ComponentFixture<ContenedorAutorizantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorAutorizantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorAutorizantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
