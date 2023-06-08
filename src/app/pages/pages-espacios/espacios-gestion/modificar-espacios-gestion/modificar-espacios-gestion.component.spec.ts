import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEspaciosGestionComponent } from './modificar-espacios-gestion.component';

describe('ModificarEspaciosGestionComponent', () => {
  let component: ModificarEspaciosGestionComponent;
  let fixture: ComponentFixture<ModificarEspaciosGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarEspaciosGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarEspaciosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
