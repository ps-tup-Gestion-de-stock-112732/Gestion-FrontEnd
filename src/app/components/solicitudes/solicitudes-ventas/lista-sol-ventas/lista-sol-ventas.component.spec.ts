import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSolVentasComponent } from './lista-sol-ventas.component';

describe('ListaSolVentasComponent', () => {
  let component: ListaSolVentasComponent;
  let fixture: ComponentFixture<ListaSolVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSolVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSolVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
