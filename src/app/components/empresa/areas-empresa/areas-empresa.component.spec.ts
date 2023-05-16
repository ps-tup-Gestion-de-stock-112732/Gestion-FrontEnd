import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasEmpresaComponent } from './areas-empresa.component';

describe('AreasEmpresaComponent', () => {
  let component: AreasEmpresaComponent;
  let fixture: ComponentFixture<AreasEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreasEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
