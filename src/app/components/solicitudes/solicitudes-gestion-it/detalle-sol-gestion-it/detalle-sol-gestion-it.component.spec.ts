import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSolGestionItComponent } from './detalle-sol-gestion-it.component';

describe('DetalleSolGestionItComponent', () => {
  let component: DetalleSolGestionItComponent;
  let fixture: ComponentFixture<DetalleSolGestionItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSolGestionItComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleSolGestionItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
