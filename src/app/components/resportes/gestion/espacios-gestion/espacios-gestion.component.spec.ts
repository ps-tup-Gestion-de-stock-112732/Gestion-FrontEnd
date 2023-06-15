import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaciosGestionComponent } from './espacios-gestion.component';

describe('EspaciosGestionComponent', () => {
  let component: EspaciosGestionComponent;
  let fixture: ComponentFixture<EspaciosGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaciosGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaciosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
