import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAutorizantesComponent } from './modificar-autorizantes.component';

describe('ModificarAutorizantesComponent', () => {
  let component: ModificarAutorizantesComponent;
  let fixture: ComponentFixture<ModificarAutorizantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAutorizantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAutorizantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
