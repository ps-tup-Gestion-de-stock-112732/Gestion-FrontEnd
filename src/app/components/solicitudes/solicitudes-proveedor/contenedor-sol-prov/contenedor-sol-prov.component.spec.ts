import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorSolProvComponent } from './contenedor-sol-prov.component';

describe('ContenedorSolProvComponent', () => {
  let component: ContenedorSolProvComponent;
  let fixture: ComponentFixture<ContenedorSolProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorSolProvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorSolProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
