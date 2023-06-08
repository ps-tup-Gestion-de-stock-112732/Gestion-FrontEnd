import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEspaciosGestionComponent } from './lista-espacios-gestion.component';

describe('ListaEspaciosGestionComponent', () => {
  let component: ListaEspaciosGestionComponent;
  let fixture: ComponentFixture<ListaEspaciosGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEspaciosGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEspaciosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
