import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPendientesComponent } from './lista-pendientes.component';

describe('ListaPendientesComponent', () => {
  let component: ListaPendientesComponent;
  let fixture: ComponentFixture<ListaPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPendientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
