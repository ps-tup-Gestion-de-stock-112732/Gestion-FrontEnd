import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSolVentasComponent } from './detalle-sol-ventas.component';

describe('DetalleSolVentasComponent', () => {
  let component: DetalleSolVentasComponent;
  let fixture: ComponentFixture<DetalleSolVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSolVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleSolVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
