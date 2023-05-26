import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorSolUsrEmpComponent } from './contenedor-sol-usr-emp.component';

describe('ContenedorSolUsrEmpComponent', () => {
  let component: ContenedorSolUsrEmpComponent;
  let fixture: ComponentFixture<ContenedorSolUsrEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorSolUsrEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorSolUsrEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
