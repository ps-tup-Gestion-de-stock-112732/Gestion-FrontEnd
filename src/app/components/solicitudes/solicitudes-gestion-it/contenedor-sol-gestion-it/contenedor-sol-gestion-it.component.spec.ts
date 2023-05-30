import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorSolGestionItComponent } from './contenedor-sol-gestion-it.component';

describe('ContenedorSolGestionItComponent', () => {
  let component: ContenedorSolGestionItComponent;
  let fixture: ComponentFixture<ContenedorSolGestionItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorSolGestionItComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorSolGestionItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
