import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsociadosComponent } from './lista-asociados.component';

describe('ListaAsociadosComponent', () => {
  let component: ListaAsociadosComponent;
  let fixture: ComponentFixture<ListaAsociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAsociadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
