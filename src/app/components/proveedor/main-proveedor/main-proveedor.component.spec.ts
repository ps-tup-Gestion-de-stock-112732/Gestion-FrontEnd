import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProveedorComponent } from './main-proveedor.component';

describe('MainProveedorComponent', () => {
  let component: MainProveedorComponent;
  let fixture: ComponentFixture<MainProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
