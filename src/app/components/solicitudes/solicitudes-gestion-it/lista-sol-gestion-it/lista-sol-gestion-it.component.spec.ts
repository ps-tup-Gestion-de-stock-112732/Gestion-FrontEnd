import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSolGestionItComponent } from './lista-sol-gestion-it.component';

describe('ListaSolGestionItComponent', () => {
  let component: ListaSolGestionItComponent;
  let fixture: ComponentFixture<ListaSolGestionItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSolGestionItComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSolGestionItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
