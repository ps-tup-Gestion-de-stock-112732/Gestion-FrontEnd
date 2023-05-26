import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorContratosComponent } from './contenedor-contratos.component';

describe('ContenedorContratosComponent', () => {
  let component: ContenedorContratosComponent;
  let fixture: ComponentFixture<ContenedorContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorContratosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
