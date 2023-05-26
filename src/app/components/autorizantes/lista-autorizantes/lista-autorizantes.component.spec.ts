import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAutorizantesComponent } from './lista-autorizantes.component';

describe('ListaAutorizantesComponent', () => {
  let component: ListaAutorizantesComponent;
  let fixture: ComponentFixture<ListaAutorizantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAutorizantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAutorizantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
