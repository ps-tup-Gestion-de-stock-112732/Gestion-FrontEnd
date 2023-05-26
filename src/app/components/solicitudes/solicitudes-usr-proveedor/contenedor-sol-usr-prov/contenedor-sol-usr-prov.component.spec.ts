import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorSolUsrProvComponent } from './contenedor-sol-usr-prov.component';

describe('ContenedorSolUsrProvComponent', () => {
  let component: ContenedorSolUsrProvComponent;
  let fixture: ComponentFixture<ContenedorSolUsrProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorSolUsrProvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorSolUsrProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
