import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEspaciosGestionComponent } from './crear-espacios-gestion.component';

describe('CrearEspaciosGestionComponent', () => {
  let component: CrearEspaciosGestionComponent;
  let fixture: ComponentFixture<CrearEspaciosGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEspaciosGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEspaciosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
