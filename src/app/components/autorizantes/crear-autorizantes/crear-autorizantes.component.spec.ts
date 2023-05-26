import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAutorizantesComponent } from './crear-autorizantes.component';

describe('CrearAutorizantesComponent', () => {
  let component: CrearAutorizantesComponent;
  let fixture: ComponentFixture<CrearAutorizantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAutorizantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAutorizantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
