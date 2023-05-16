import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasivaEmpleadosComponent } from './masiva-empleados.component';

describe('MasivaEmpleadosComponent', () => {
  let component: MasivaEmpleadosComponent;
  let fixture: ComponentFixture<MasivaEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasivaEmpleadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasivaEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
